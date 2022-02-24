const mysql = require('mysql')

const connect = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.USER_DB_PASSWORD,
    database: process.env.DB
})

module.exports = connect