INSERT INTO department (name)
VALUES  ('Administration'),
        ('Programming'),
        ('Sales and Marketing');

INSERT INTO role (title, salary, department_id)
VALUES  ("Senior Engineer", 120000, 2),
        ("Junior Engineer", 60000, 2),
        ("Marketing", 75000, 3),
        ("Sales", 65000, 3),
        ('Executive', 150000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
    VALUES  ("Todd", "Smith", 2, null),
            ("Kevin", "Jameson", 1, 1),
            ("Sarah", "Johnson", 3, 2),
            ("Rebeccah", "Lorentz", 5, 2),
            ("Greg", "Siggins", 1, 1);




