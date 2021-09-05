const axios = require('axios').default;

require('dotenv').config();

const base = new URL('http://61.43.246.153');
base.pathname = '/openapi-data/service/busanBIMS2/stopArr';
base.search = new URLSearchParams({
    serviceKey: '/xFc4AdSit3wq68y/gc7Vqzqh0EnFrZbuTtUz/zOYCDgEDz3fhvIqRGsgO4Ygiuri0sd+wq1bJktZ1lrBYCALg==',
    bstopid: '506480000'
})
const url = base.toString();

console.log('Axios Request:', url);

const updateCityBusDB = async () => {
    try {
        const res = await axios.get(url, { timeout: 20000 });
        // 기존 DB 데이터 delete

        if (res?.data?.response?.body?.items?.item){
            res?.data?.response?.body?.items?.item.map((item) => {
                if (item?.bstopIdx == 10) {
                    console.log('구서동 방향');
                    if (item.min1)
                        console.log('첫 번째 버스:', item.min1);
                    if (item.min2)
                        console.log('두 번째 버스:', item.min2)
                } else if (item?.bstopIdx == 62) {
                    console.log('노포동 방향');
                    if (item.min1)
                        console.log('첫 번째 버스:', item.min1)
                    if (item.min2)
                        console.log('두 번째 버스:', item.min2)
                }
            })
            return { result: 'success' };
        }
    } catch (error) {
        // 기존 DB 데이터 delete
        console.log(error);
        return { result: 'fail' };
    }
}

module.exports = updateCityBusDB;