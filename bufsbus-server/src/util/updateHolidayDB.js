const axios = require('axios').default;
const rax = require('retry-axios');

require('dotenv').config();

const base = new URL('http://apis.data.go.kr');
base.pathname = '/B090041/openapi/service/SpcdeInfoService/getRestDeInfo';
base.search = new URLSearchParams({
    serviceKey: '/xFc4AdSit3wq68y/gc7Vqzqh0EnFrZbuTtUz/zOYCDgEDz3fhvIqRGsgO4Ygiuri0sd+wq1bJktZ1lrBYCALg==',
    solYear: '2021',
    numOfRows: '50'
})
const url = base.toString();

console.log('Axios request:', url);

const updateHolidayDB = async () => {
    try {
        rax.attach();
        const res = await axios.get(url, { timeout: 5000, raxConfig: { retry: 100, retryDelay: 100 }});

        if (res?.data?.response?.body?.items?.item){
            res?.data?.response?.body?.items?.item.map((date) => {
                console.log(date.dateName, date.locdate.toString());
            })
        }
        return { result: 'success' };

    } catch (error) {
        console.log(error.message)
        if (error.code == 'ECONNABORTED') {
            return await updateHolidayDB();
        }
        return { result: 'fail' };
    }
}

module.exports = updateHolidayDB;