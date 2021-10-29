const axios = require('axios').default;
const parser = require('fast-xml-parser');
const pool = require('../db');

require('dotenv').config();

const updateCityBusDB = async () => {
    const base = new URL('http://apis.data.go.kr');
    base.pathname = '/6260000/BusanBIMS/stopArrByBstopid';
    base.search = new URLSearchParams({
        serviceKey: '/xFc4AdSit3wq68y/gc7Vqzqh0EnFrZbuTtUz/zOYCDgEDz3fhvIqRGsgO4Ygiuri0sd+wq1bJktZ1lrBYCALg==',
        bstopid: '506480000',
        numOfRows: '10',
        pageNo: '1'
    })
    const url = base.toString();

    try {
        const res = await axios.get(url, { timeout: 30000 });
        if (!res?.data)
            throw Error();
        const data = parser.parse(res.data);
        await pool.query('DELETE FROM city_301');
        for (item of data.response.body.items.item) {
            const bstop = item.bstopidx == 10 ? 'guseo' : 'nopo';
            const min1 = item.min1 || 'NULL';
            const min2 = item.min2 || 'NULL';
            const queryText = `INSERT INTO city_301 VALUES ('${bstop}',${min1},${min2})`
            await pool.query(queryText);
        }
        const [ rows ] = await pool.query('SELECT * FROM city_301');
        return { updateCityBus: rows, updatedAt: new Date().toISOString() };
    } catch (error) {
        await pool.query('DELETE FROM city_301');
        return error.toString();
    }
}

module.exports = updateCityBusDB;