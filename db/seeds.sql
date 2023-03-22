INSERT INTO department (name)
VALUES 
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Salesperson", 50000, 1),
    ("Engineer", 60000, 2),
    ("Software Engineer", 70000, 2),
    ("Lawyer", 80000, 4),
    ("CPA", 90000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Tom", "Smith", 3, null ),
    ("Bob", "Jones", 2, 1),
    ("Cindy", "Thomas", 1, 1),
    ("Tom", "Jones", 4, 1),
    ("Nancy", "Brown", 1, 1);