import mysql from "mysql";

//Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wwms'
})

export default db;