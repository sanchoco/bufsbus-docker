const express = require('express');
const cors = require('cors');
const path = require('path');
const api = require('./api');
const schedule = require('node-schedule');
const { errorHandler, updateCityBusDB, updateHolidayDB } = require('../util');

const server = async () => {

    // init db data
    await updateCityBusDB();
    await updateHolidayDB();

    // set schedule job
    schedule.scheduleJob('0,20,40 * * * * *', async () => {
        await updateCityBusDB();
        console.log('City bus DB updated.' + new Date().toISOString());
    });
    schedule.scheduleJob({tz: 'Asia/Seoul', date: 0, hour: 0, minute: 0, second: 0}, async () => {
        await updateHolidayDB();
        console.log('Holiday DB updated. ' + new Date().toISOString());
    });

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

    // api
    app.use('/api', api);

    // error handling
    app.use(errorHandler);

    app.listen(port, host, () => { console.log(`BUFS-BUS Server starting in http://${host}:${port}/`)})
}

module.exports = server;