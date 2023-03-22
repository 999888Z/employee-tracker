// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);


const prompts = {
  option1: [
    {
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
      ],
      name: "answer1",
    },
  ],

  option3: [
    {
      type: "list",
      choices: ["YES", "NO"],
      message: "Would you like to start again?",
      name: "answer3",
    },
  ],
}
const appBegin = () => {
  inquirer
    .prompt(prompts.option1)

    .then((answers) => {
      if (answers.answer1 === "View All Departments") {
        viewAllDepartments();
      } else if (answers.answer1 === "View All Roles") {
        viewAllRoles();
      } else if (answers.answer1 === "View All Employees") {
        viewAllEmployees();
      } else if (answers.answer1 === "Add a Department") {
        addADepartment();
      } else if (answers.answer1 === "Add a Role") {
        addARole();
      } else if (answers.answer1 === "Add an Employee") {
        addAnEmployee();
      } else if (answers.answer1 === "Update an Employee Role") {
        updateAnEmployeeRole();
      }
    });
};

const viewAllDepartments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    startOver();
  });
};

const viewAllRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    startOver();
  });
};

const viewAllEmployees = () => {
  db.query(`SELECT employee.id,  employee.first_name,  employee.last_name, role.title, department.name,
    role.salary, CONCAT (full.first_name, " ", full.last_name) AS Manager FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee full ON employee.manager_id = full.id;`, function (err, results) {
    console.table(results)
    startOver()
  });
};

const addADepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "department1",
      },
    ])

    .then((answers) => {
      db.query(
        `INSERT INTO department(name) VALUES("${answers.department1}")`,
        (err, res) => {
          if (err) throw err;

          console.log("\nYour department has been succesfully added! ✔️");
        }
      );
      startOver();
    });
};

const addARole = () => {
  db.query("SELECT * FROM department", (err, resOfDept) => {
    let departments = [];

    for (let i = 0; i < resOfDept.length; i++) {
      departments.push(resOfDept[i]);
    }

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role?",
          name: "role1",
        },
        {
          type: "input",
          message: "What is the salary of the role?",
          name: "role2",
        },

        {
          type: "list",
          message: "What department does the role belong to?",
          choices: departments,
          name: "role3",
        },
      ])

      .then((answers) => {
        let departmentNumber = 0;

        for (let i = 0; i < resOfDept.length; i++) {
          if (resOfDept[i].name === answers.role3) {
            departmentNumber = resOfDept[i].id;
          }
        }
        db.query(`INSERT INTO role(title, salary, department_id) VALUES("${answers.role1}", 
      "${answers.role2}", "${departmentNumber}")`);
      console.log(`${answers.role1} added to the database.✔️`)
        startOver();
      });
  });
};

const addAnEmployee = () => {
  db.query("SELECT * FROM role", (err, resOfBoth) => {
    let roles = [];

    for (let i = 0; i < resOfBoth.length; i++) {
      roles.push(resOfBoth[i].title);
    }

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "employee1",
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "employee2",
        },

        {
          type: "list",
          message: "What is the employee's role?",
          choices: roles,
          name: "employee3",
        },
      ])

      .then((answers) => {
        let roleNumber = 0;

        for (let i = 0; i < resOfBoth.length; i++) {
          if (resOfBoth[i].title === answers.employee3) {
            roleNumber = resOfBoth[i].id;
          }
        }

        managerNames(answers.employee1, answers.employee2, roleNumber);
      });
  });
};

const managerNames = (first, last, role_number) => {
  db.query("SELECT * FROM employee", (err, resOfEmployees) => {
    let manager = [];

    for (let i = 0; i < resOfEmployees.length; i++) {
      manager.push(
        resOfEmployees[i].first_name + " " + resOfEmployees[i].last_name
      );
    }

    inquirer
      .prompt([
        {
          type: "list",
          message: "Who is the employee's manager?",
          choices: manager,
          name: "employee4",
        },
      ])

      .then((answers) => {
        let emp_id;
        for (let a = 0; a < resOfEmployees.length; a++) {
          if (
            resOfEmployees[a].first_name + " " + resOfEmployees[a].last_name ==
            answers.employee4
          ) {
            emp_id = resOfEmployees[a].id;
          }
        }
        db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${first}", 
        "${last}", "${role_number}", "${emp_id}" )`);
        console.log(`${first} ${last} has been added to the database.✔️`)
        startOver();
      });
  });
};

const updateAnEmployeeRole = () => {
  db.query("SELECT * from employee", (err, resOfEmp) => {
    let employees = [];
  

    for (let i = 0; i < resOfEmp.length; i++) {
      employees.push(resOfEmp[i].first_name + " " + resOfEmp[i].last_name);
    }

    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee's role do you want to update?",
          choices: employees,
          name: "newRole1",
        },
        
      ])
      .then((answers) => {
        let empNumber = 0;

        for (let i = 0; i < resOfEmp.length; i++) {
          if (resOfEmp[i].first_name + " " + resOfEmp[i].last_name === answers.newRole1) {
            empNumber = resOfEmp[i].id;
          }
        }
        newRole(empNumber)

        
      });
  });

  
};
const newRole = (empNumber) => {
  db.query("SELECT * from role", (err, resOfRoles) => {
    let roles = [];
  

    for (let i = 0; i < resOfRoles.length; i++) {
      roles.push(resOfRoles[i].title);
    }
    inquirer
    .prompt([
      
      {
        type: "list",
        message: "Which role do you want to assign to the selected employee?",
        choices: roles,
        name: "newRole1",
      },

    ])
    .then((answers) => {
      let roleNumber = 0;

      for (let i = 0; i < resOfRoles.length; i++) {
        if (resOfRoles[i].title === answers.newRole1) {
          roleNumber = resOfRoles[i].id;
        }
      }
db.query(`UPDATE employee SET role_id = ${roleNumber} WHERE employee.id = ${empNumber} `)


console.log("This employee has been updated.✔️")
startOver();



    })
}
  )}

const startOver = () => {
  inquirer.prompt(prompts.option3).then((answers) => {
    if (answers.answer3 === "YES") {
      appBegin();
    } else if (answers.answer3 === "NO") {
      console.log("Thank you for your time.👏");
      process.exit();
    }
  });
};
appBegin();
