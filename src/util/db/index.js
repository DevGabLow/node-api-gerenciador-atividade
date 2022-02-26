const mysql = require('mysql')

const connect = mysql.createConnection({
    host: process.env.HML_CERS_DB_HOST,
    user: process.env.USER_DB,
    password: process.env.USER_DB_PASSWORD,
    database: process.env.HML_CERS_DB_NAME
})

module.exports = connect