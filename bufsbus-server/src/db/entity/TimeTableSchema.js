const EntitySchema = require("typeorm").EntitySchema;
const { TimeTable } = require('../model')

module.exports = new EntitySchema({
    name: "TimeTable",
    target: TimeTable,
    columns: {
        arrive: {
            primary: true,
            type: 'time',
        }
    }
})