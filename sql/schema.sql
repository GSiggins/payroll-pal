DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name: VARCHAR(30)
)

CREATE TABLE role (
    id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    title: VARCHAR(30) NOT NULL,
    salary: INT NOT NULL,
    department_id: INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL,
)

CREATE TABLE employee (
    id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY
    first_name: VARCHAR(30) NOT NULL,
    last_name: VARCHAR(30) NOT NULL,
    role_id: INT NOT NULL,
    CONSTRAINT fk_manager,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id),
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
)

