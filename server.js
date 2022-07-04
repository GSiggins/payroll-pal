const express = require('express');
const sql = require('mysql2');
const inquirer = require('inquirer')
const { Department, Employee, Role } = require('./resources')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = sql.createConnection(
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

// Sets empty arrays for employees, roles, and departments to populate with additions
employeeArray = [];
roleArray = [];
departmentArray = [];
//Sets answers to main menu questions
mainChoiceArr = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']


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
        // Creates switch cases for every answer for the main menu and sends the user to the appropriate function
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

                case 'Quit':
                    break;
            }
        })
}

// Displays prompts to add employees
function addEmp() {
    // Creates a map array of role names for a user to choose later.
    let roleChoices = [];
    let roleChoiceMapped = [];
    const sql = `SELECT id, title FROM role;`;

    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            roleChoices = data;
            roleChoiceMapped = roleChoices.map(element => {
                return { id: element.id, value: element.title }, roleChoiceMapped;
            })
        }

        // Prompts user through relevant inputs for creating an employee
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
                    type: 'list',
                    message: 'What is the employees role?',
                    name: "role",
                    // Uses mapped array from earlier
                    choices: roleChoiceMapped
                },
                {
                    type: 'input',
                    message: 'Who is the employees manager?',
                    name: 'manager'
                },
            ])
            // Creates new object using inquirer answers
            .then(answers => {
                const employee = new Employee(
                    answers.firstname,
                    answers.lastname,
                    answers.title,
                    answers.role,
                    answers.manager,
                )

                // Pushes new object to array
                employeeArray.push(employee);

                // Initiates a db.query to insert 
                const sql1 = `SELECT id FROM role WHERE title ='${answers.role}';`;
                console.log(answers.role)
                const params1 = [employee.role]
                db.query(sql1, params1, (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        const sql2 = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
                        const params2 = [employee.firstname, employee.lastname, data[0].id, employee.manager]
                        db.query(sql2, params2, (err, res) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log('\n');
                                viewEmployees();
                                console.log('\n');
                            }
                        })
                    }
                })
                console.log('~~~~~~~~~~~~~~~~~~~~~~')
                mainSplash();
            })
    });
    return roleChoiceMapped, employeeArray;
}

function addRole() {
    let departmentChoices = [];
    let depChoiceMapped = [];
    const sql = `SELECT id, name FROM department;`;
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            departmentChoices = data;
            depChoiceMapped = departmentChoices.map(element => {
                return { name: element.name, value: element.id }
            })
        }
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
                    type: 'list',
                    message: 'What is the department for this role?',
                    name: 'roleDep',
                    choices: depChoiceMapped
                },
            ])
             // Creates new object using inquirer answers
            .then(answers => {
                const role = new Role(
                    answers.roleTitle,
                    answers.salary,
                    answers.roleDep,
                )

                // Pushes new object to array
                roleArray.push(role);
                const sql = `INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);`;
                const params = [role.title, role.salary, role.department]

                db.query(sql, params, (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('\n')
                        viewRoles();
                        console.log('\n')
                    }
                })
                console.log('~~~~~~~~~~~~~~~~~~~~~~')
                mainSplash();
            })
    });
};

function addDep() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the department name?',
                name: 'depName'
            },
        ])
        .then(answers => {
             // Creates new object using inquirer answers
            const department = new Department(
                answers.depName,
            )
            departmentArray.push(department);
            const sql = `INSERT INTO department(name) VALUES (?);`;
            const params = [department.name]
            db.query(sql, params, (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('\n')
                    viewDepartment();
                    console.log('\n')
                }
            })
            console.log('~~~~~~~~~~~~~~~~~~~~~~')
            mainSplash();
        })
};

function updRole() {
    let roleChoices = [];
    let roleChoiceMapped = [];
    const sql = `SELECT id, title FROM role;`;
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            roleChoices = data;
            roleChoiceMapped = roleChoices.map(element => {
                return { id: element.id, value: element.title }, roleChoiceMapped;
            })
        }
        const sql = `SELECT * FROM employee;`;
        db.query(sql, function (err, data) {
            if (err) {
                console.error(err);
            } else {
                console.log('\n');
                console.table(data);
                console.log('\n');
            }
            console.log('~~~~~~~~~~~~~~~~~~~~~~');
        });
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Which employee id are you updating?',
                    name: 'id',
                },
                {
                    type: 'input',
                    message: 'What is the employees updated role id?',
                    name: "role",
                },
            ])
            .then(answers => {
                const sql = `UPDATE employee SET role_id=? WHERE id=?;`;
                const params = [answers.role, answers.id]
                db.query(sql, params, (err, res) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('\n');
                        viewEmployees();
                        console.log('\n');
                    }
                })
            }
            )
    })
}

function viewDepartment() {
    const sql = `SELECT * FROM department;`;
    db.query(sql, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log('\n');
            console.table(data);
            console.log('\n');
        }
        console.log('~~~~~~~~~~~~~~~~~~~~~~');
        mainSplash();
    });
}

function viewEmployees() {
    const sql = `SELECT employee.id, 
    employee.first_name AS First, employee.last_name AS Last, 
    role.title AS Title, 
    role.salary AS Salary, 
    department.name AS Department, 
    CONCAT(manager.first_name, '', manager.last_name) AS Manager 
    FROM employee employee 
    LEFT JOIN employee manager 
    ON employee.manager_id = manager.id, 
    JOIN role ON employee.role_id = role.id,
    JOIN department 
    ON role.department_id = department.id;`;
    db.query(sql, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log('\n');
            console.table(data);
            console.log('\n');
        }
        console.log('~~~~~~~~~~~~~~~~~~~~~~');
        mainSplash();
    });
}

function viewRoles() {
    const sql = `SELECT 
    role.title,
    role.id,
    role.salary,
    department.name
    FROM role
    LEFT JOIN department
    ON role.department_id = department.id;`;
    db.query(sql, function (err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log('\n');
            console.table(data);
            console.log('\n');
        }
        console.log('~~~~~~~~~~~~~~~~~~~~~~');
        mainSplash();
    });
}
mainSplash()

module.exports = db;