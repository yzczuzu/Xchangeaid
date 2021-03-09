const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'activity' ,
    {
        activityId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        activityContent: {
            type: Sequelize.STRING
        },
        activityTitle: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        postDatetime: {
            type: Sequelize.DATE
        },
        activityDatetime: {
            type: Sequelize.DATE
        },
        comment: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)