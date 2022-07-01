const express = require('express');
const inquirer = require('inquirer');
const sql = require('mysql2');
const resources = require('./resources')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: DB_USER,
        // TODO: Add MySQL password here
        password: DB_PASSW,
        database: DATABASE
    },
    console.log(`Connected to the employees_db database.`)
);

mainChoiceArr = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
employeeArray = [];
roleArray = [];
departmentArray = [];


function mainSplash() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'main',
                choices: mainChoiceArr,
            },
        ])
        .then(answer => {
            switch (answer.main) {
                case 'View all departments':
                    viewDepartment();
                    break;

                case 'View all roles':
                    viewRoles();
                    break;

                case 'View all employees':
                    viewEmployees();
                    break;

                case 'Add a department':
                    addDep();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Add an employee':
                    addEmp();
                    break;

                case 'Update an employee role':
                    updRole();
                    break;

                default:
                    buildTeam();
                    break;
            }
        })
}

const addEmp = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the employees first name?',
                name: 'firstname'
            },
            {
                type: 'input',
                message: 'What is the employees last name?',
                name: 'lastname'
            },
            {
                type: 'input',
                message: 'What is the employees title?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the employees role?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'Who is the employees manager?',
                name: 'manager'
            },
        ])
        .then(answers => {
            const employee = new Employee(
                answers.firstname,
                answers.lastname,
                answers.title,
                answers.role,
                answers.manager,
            )
            employeeArray.push(employee);
            mainSplash();
        })
}

const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the role title?',
                name: 'roleTitle'
            },
            {
                type: 'input',
                message: 'What is the salary for the role?',
                name: 'salary'
            },
            {
                type: 'input',
                message: 'What is the department for this role?',
                name: 'roleDep'
            },
        ])
        .then(answers => {
            const role = new Role(
                answers.roleTitle,
                answers.salary,
                answers.roleDep,
            )
            roleArray.push(role);
            mainSplash();
        })
}


const addDep = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the department name?',
                name: 'depName'
            },
        ])
        .then(answers => {
            const department = new Department(
                answers.depName,
            )
            departmentArray.push(department);
            mainSplash();
        })
}