const axios = require('axios').default;
require('dotenv').config();

const updateCityBusDB = async (pool) => {
    const base = new URL('http://61.43.246.153');
    base.pathname = '/openapi-data/service/busanBIMS2/stopArr';
    base.search = new URLSearchParams({
        serviceKey: '/xFc4AdSit3wq68y/gc7Vqzqh0EnFrZbuTtUz/zOYCDgEDz3fhvIqRGsgO4Ygiuri0sd+wq1bJktZ1lrBYCALg==',
        bstopid: '506480000'
    })
    const url = base.toString();

    try {
        const res = await axios.get(url, { timeout: 30000 });
        await pool.query('DELETE FROM city_301');
        if (res?.data?.response?.body?.items?.item){
            for (item of res?.data?.response?.body?.items?.item) {
                const bstop = item?.bstopIdx == 10 ? 'guseo' : 'nopo';
                const min1 = item.min1 || 'NULL';
                const min2 = item.min2 || 'NULL';
                const queryText = `INSERT INTO city_301 VALUES ('${bstop}',${min1},${min2})`
                await pool.query(queryText);

            }
            const [ rows ] = await pool.query('SELECT * FROM city_301');
            return { updateCityBus: rows, updatedAt: new Date().toISOString() };
        }
    } catch (error) {
        await pool.query('DELETE FROM city_301');
        return error.toString();
    }
}

module.exports = updateCityBusDB;