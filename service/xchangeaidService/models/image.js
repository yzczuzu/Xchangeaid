const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'test' ,
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Sequelize.BLOB("long")
        }
    },
    {
        timestamps: false
    }
)