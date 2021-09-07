const axios = require('axios').default;
const rax = require('retry-axios');
const pool = require('../db');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

require('dotenv').config();

const updateHolidayDB = async () => {
    try {
        const connection = await pool.getConnection(async conn => conn);
        const year = dayjs().tz('Asia/Seoul').format('YYYY');

        const base = new URL('http://apis.data.go.kr');
        base.pathname = '/B090041/openapi/service/SpcdeInfoService/getRestDeInfo';
        base.search = new URLSearchParams({
            serviceKey: '/xFc4AdSit3wq68y/gc7Vqzqh0EnFrZbuTtUz/zOYCDgEDz3fhvIqRGsgO4Ygiuri0sd+wq1bJktZ1lrBYCALg==',
            solYear: year,
            numOfRows: '50'
        })
        const url = base.toString();

        console.log('Axios request:', url);

        rax.attach();
        const res = await axios.get(url, { timeout: 1000, raxConfig: { retry: 100, retryDelay: 100 }});
        if (res?.data?.response?.body?.items?.item){
            await connection.query('DELETE FROM holiday');
            const item = res?.data?.response?.body?.items?.item.map((date) => {
                return `('${date.dateName}','${date.locdate}')`
            })
            await connection.query(`INSERT INTO holiday VALUES ${item.toString()}`);
        }
        [rows] = await connection.query('SELECT * FROM holiday');
        connection.release();
        return { updateHolidayDB: rows };

    } catch (error) {
        console.error(error.stack);
        if (error.code == 'ECONNABORTED')
            return await updateHolidayDB();
        else {
            return { updateHolidayDB: error.stack };
        }
    }
}

module.exports = updateHolidayDB;