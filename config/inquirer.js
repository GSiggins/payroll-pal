const mainSplash = require('../server')
const resources = require('../resources')

employeeArray = [];
roleArray = [];
departmentArray = [];


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

