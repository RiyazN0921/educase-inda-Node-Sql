const { Sequelize } = require('sequelize')

require('dotenv').config()

const connectionString =
  process.env.DATABASE_URL ||
  `${process.env.DB_DIALECT}://${process.env.DB_USER}:${process.env.DB_PASSWORD}` +
    `@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

const sequelize = new Sequelize(connectionString, {
  dialect: 'mysql',
  logging: false,
})

module.exports = sequelize
