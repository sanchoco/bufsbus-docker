const EntitySchema = require("typeorm").EntitySchema;
const { CityBus } = require('../model')

module.exports = new EntitySchema({
    name: "CityBus",
    target: CityBus,
    columns: {
        bus_stop: {
            primary: true,
            type: 'char',
            length: 50
        },
        min1: { type: 'int' },
        min2: { type: 'int' }
    }
})