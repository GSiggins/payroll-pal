const db = require('./connection')
const tables = require('console.table')

function queryHandler() {
    function viewDepartment() {
        const sql = `SELECT * FROM departments;`;
        db.query(sql, (params), (err, data) => {
            console.table(data);
        })
    }

    function viewEmployees() {
        const sql = `SELECT * FROM employees;`;
        db.query(sql, (params), (err, data) => {
            console.table(data);
        })
    }
    function viewRoles() {
        const sql = `SELECT * FROM roles;`;
        db.query(sql, (params), (err, data) => {
            console.table(data);
        })
    }

    function addEmp(employee) {
        const sql = `INSERT INTO employees(first_name, last_name, role_id) VALUES (?, ?, ?);`;
        const params = [employee.first_name, employee.last_name, employee.role_id]
        db.query(sql, (params), (err, data) => {
            console.table(data);
        })
    }
}
// view dep
// view dep function
// run sql to connect to db
// 