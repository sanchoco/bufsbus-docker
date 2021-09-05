const EntitySchema = require("typeorm").EntitySchema;
const { Holiday } = require('../model')

module.exports = new EntitySchema({
    name: "Holiday",
    target: Holiday,
    columns: {
        dateName: {
            type: 'char',
            length: 50
        },
        locdate: {
            type: 'date',
            primary: true
        }
    }
})