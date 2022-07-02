const express = require('express');
const inquirer = require('inquirer');
const sql = require('mysql2');
const resources = require('./resources')
const inqJS = require('./config/inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



mainChoiceArr = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']


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

mainSplash()

module.exports = mainSplash;