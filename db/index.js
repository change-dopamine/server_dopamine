const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'lq1597530',
    database: 'my_db_01'
})

module.exports = db