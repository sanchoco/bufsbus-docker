const axios = require('axios').default;
const pool = require('../db');
require('dotenv').config();

const updateCityBusDB = async () => {

    const base = new URL('http://61.43.246.153');
    base.pathname = '/openapi-data/service/busanBIMS2/stopArr';
    base.search = new URLSearchParams({
        serviceKey: '/xFc4AdSit3wq68y/gc7Vqzqh0EnFrZbuTtUz/zOYCDgEDz3fhvIqRGsgO4Ygiuri0sd+wq1bJktZ1lrBYCALg==',
        bstopid: '506480000'
    })
    const url = base.toString();

    try {
        const connection = await pool.getConnection(async conn => conn);
        const res = await axios.get(url, { timeout: 20000 });
        await connection.query('DELETE FROM city_301');
        if (res?.data?.response?.body?.items?.item){
            for (item of res?.data?.response?.body?.items?.item) {
                const bstop = item?.bstopIdx == 10 ? 'guseo' : 'nopo';
                const min1 = item.min1 || 'NULL';
                const min2 = item.min2 || 'NULL';
                const queryText = `INSERT INTO city_301 VALUES ('${bstop}',${min1},${min2})`
                await connection.query(queryText);

            }
            const [ rows ] = await connection.query('SELECT * FROM city_301');
            connection.release();
            return { updateCityBus: rows };
        }
    } catch (error) {
        console.log(error.stack);
        return { updateCityBus: error };
    }
}

module.exports = updateCityBusDB;