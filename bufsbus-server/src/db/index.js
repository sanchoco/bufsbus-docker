const typeorm = require("typeorm");
const { CityBusSchema, HolidaySchema, TimeTableSchema } = require("./entity");
require('dotenv').config();

module.exports = async () => {
    return typeorm.createConnection({
        type: "mysql",
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        synchronize: false,
        logging: false,
        entities: [ CityBusSchema, HolidaySchema, TimeTableSchema ],
        timezone: 'Asia/Seoul'
    });
}


