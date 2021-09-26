const axios = require('axios').default;
const pool = require('../db');
const rax = require('retry-axios');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

require('dotenv').config();

const updateHolidayDB = async () => {
    try {
        const year = dayjs().tz('Asia/Seoul').format('YYYY');

        const base = new URL('http://apis.data.go.kr');
        base.pathname = '/B090041/openapi/service/SpcdeInfoService/getRestDeInfo';
        base.search = new URLSearchParams({
            serviceKey: '/xFc4AdSit3wq68y/gc7Vqzqh0EnFrZbuTtUz/zOYCDgEDz3fhvIqRGsgO4Ygiuri0sd+wq1bJktZ1lrBYCALg==',
            solYear: year,
            numOfRows: '50'
        })
        const url = base.toString();

        rax.attach();
        const res = await axios.get(url, { timeout: 5000, raxConfig: { retry: 100, retryDelay: 100 }});
        if (res?.data?.response?.body?.items?.item){
            await pool.query('DELETE FROM holiday');
            const item = res?.data?.response?.body?.items?.item.map((date) => {
                return `('${date.dateName}','${date.locdate}')`
            })
            await pool.query(`INSERT INTO holiday VALUES ${item.toString()}`);
        }
        [rows] = await pool.query('SELECT * FROM holiday');
        return { updateHolidayDB: rows, updatedAt: new Date().toISOString() };

    } catch (error) {
        console.error(error);
        if (error.code == 'ECONNABORTED')
            return await updateHolidayDB();
        else {
            return error.toString();
        }
    }
}

module.exports = updateHolidayDB;