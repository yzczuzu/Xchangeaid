const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'article' ,
    {
        idpost: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER
        },
        articleContent: {
            type: Sequelize.STRING
        },
        articleTitle: {
            type: Sequelize.STRING
        },
        dateTime: {
            type: Sequelize.DATE
        },
        likes: {
            type: Sequelize.INTEGER
        },
        img: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)