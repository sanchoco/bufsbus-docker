const express = require('express');
const cors = require('cors');
const path = require('path');
const api = require('./api');
const schedule = require('node-schedule');
const { errorHandler, updateCityBusDB, updateHolidayDB } = require('../util');

const server = async () => {

    // init db data
    console.log(await updateCityBusDB());
    console.log(await updateHolidayDB());

    // set schedule job
    schedule.scheduleJob('30 * * * * *', async () => {
        console.log(await updateCityBusDB());
    });
    schedule.scheduleJob({tz: 'Asia/Seoul', date: 0, hour: 0, minute: 0, second: 0}, async () => {
        console.log(await updateHolidayDB());
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

    app.listen(port, host, ()=> { console.log(`BUFS-BUS Server starting in http://${host}:${port}/`)})
}

module.exports = server;