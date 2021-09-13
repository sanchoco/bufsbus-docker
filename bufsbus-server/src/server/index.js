const express = require('express');
const cors = require('cors');
const path = require('path');
const api = require('./api');
const schedule = require('node-schedule');
const { errorHandler, updateCityBusDB, updateHolidayDB } = require('../util');
const pool = require('../db');

const server = async () => {
    // init db data
    await updateCityBusDB(pool);
    await updateHolidayDB(pool);

    // set schedule job
    schedule.scheduleJob('0,30 * * * * *', async () => {
        try {
            await updateCityBusDB(pool);
            console.log('City bus DB updated.' + new Date().toISOString());
        } catch (err) {
            console.log('City bus DB Update error!');
        }
    });
    schedule.scheduleJob({tz: 'Asia/Seoul', date: 0, hour: 0, minute: 0, second: 0}, async () => {
        try {
            await updateHolidayDB(pool);
            console.log('Holiday DB updated. ' + new Date().toISOString());
        } catch (err) {
            console.log('Holiday DB Update error!');
        }
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
    app.get('/loaderio-9a1e6494b39edfaa43bd8eb44761bdcc.txt',
      (req, res) => res.sendFile(path.normalize(__dirname + '/../website/loaderio-9a1e6494b39edfaa43bd8eb44761bdcc.txt')))
    app.get('/health', (req, res) => res.send('health check page'));
    // api
    app.use('/api', api);

    // error handling
    app.use(errorHandler);

    app.listen(port, host, () => { console.log(`BUFS-BUS Server starting in http://${host}:${port}/`)})
}

module.exports = server;