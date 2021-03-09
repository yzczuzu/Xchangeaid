const Sequelize = require("sequelize")
const db = {}
// const sequelize = new Sequelize("dbi327993","dbi327993","dickson",{
//     host: "studmysql01.fhict.local",
//     dialect: "mysql",
//     operatorAliases: false,

//     pool: {
//         max: 5, 
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// })

const sequelize = new Sequelize("Ly50rFcWYW","Ly50rFcWYW","MgNKHF3Bv4",{
    host: "remotemysql.com",
    dialect: "mysql",
    operatorAliases: false,

    pool: {
        max: 5, 
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})


db.sequelize = sequelize
db.sequelize = sequelize

module.exports = db