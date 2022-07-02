const express = require('express');
const sql = require('mysql2');
const inqJS = require('./config/inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dbconn = sql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'SQLSIGpassw123!',
        database: 'company_db' 
    },
    console.log(`Connected to the employees_db database.`)
);



module.exports = dbconn;