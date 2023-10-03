const express = require('express');
const cors = require('cors');
const path = require('path');
// const api = require('./api');
// const schedule = require('node-schedule');
const { errorHandler } = require('../util');

const server = async () => {
    // init db data
    // setTimeout(() => {
    //     updateCityBusDB().then(console.log).catch(console.error);
    //     updateHolidayDB().then(console.log).catch(console.error);
    // }, 1000);

    // // set schedule job
    // schedule.scheduleJob('0,30 * * * * *', () => {
    //     updateCityBusDB().then(console.log).catch(console.error);
    // });
    // schedule.scheduleJob({tz: 'Asia/Seoul', date: 0, hour: 0, minute: 0, second: 0}, () => {
    //     updateHolidayDB().then(console.log).catch(console.error);
    // });

    // init express
    const app = express();
    const port = process.env.PORT || 3000;
    const host = '0.0.0.0';
    const web = path.normalize(__dirname + '/../website');
    
    // middleware
    app.use(express.json());
    app.use(cors());
    app.use(express.static(web));
    
    // site
    app.get('/', (req, res) => res.sendFile(web));
    app.get('/health', (req, res) => res.send('health check page'));
    // api
    // app.use('/api', api);

    // error handling
    app.use(errorHandler);

    app.listen(port, host, () => { console.log(`BUFS-BUS Server starting in http://${host}:${port}/`)})
}

module.exports = server;