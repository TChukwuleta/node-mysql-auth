const dbConfig = require('../config/dbConfig')
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log("Connected...")
})
.catch((e) => {
    console.log("Error " + e)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.users = require('./userModel')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log("Re-sync done!")
})

module.exports = db