const db = require('./connection')
const tables = require('console.table')

function viewDepartment () {
    const sql = `SELECT * FROM departments;`;
db.query(sql, (params), (err, rows) => {

    console.table(rows);
})
}

function addEmp (employee) {
    const sql = `INSERT INTO employees(first_name, last_name, role_id) VALUES (?, ?, ?);`;
    const params = [{  }]
    db.query(sql, (params), (err, rows) => {

        console.table(rows);
    })
    }
// view dep
// view dep function
// run sql to connect to db
// 