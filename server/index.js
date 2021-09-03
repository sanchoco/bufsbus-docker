const express = require('express');
const cors = require('cors');
const api = require('./api');

const server = () => {
    const app = express();
    const port = process.env.PORT || 3000;
    
    app.use(express.json());
    app.use(cors());
    app.use(api);
    
    app.listen(port, ()=> { console.log(`BUFS BUS Server starting in http://localhost:${port}`)})
}

module.exports = server;