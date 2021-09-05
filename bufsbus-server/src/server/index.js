const express = require('express');
const cors = require('cors');
const path = require('path');
const api = require('./api');
const { errorHandler } = require('../util');

const app = express();
const port = process.env.PORT || 3000;
const web = path.normalize(__dirname + '/../website');

const server = () => {
    app.use(express.json());
    app.use(cors());
    app.use(express.static(web));

    // site
    app.get('/', (req, res) => res.sendFile(web));

    // api
    app.use('/api', api);

    // error handling
    app.use(errorHandler);

    app.listen(port, ()=> { console.log(`BUFS-BUS Server starting in http://localhost:${port}/`)})
}

module.exports = server;