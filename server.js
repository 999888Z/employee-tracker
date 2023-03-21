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

// // Query database
// db.query('SELECT * FROM employee', function (err, results) {
//   console.log(results);
// });
// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
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
  option2: [
    {
      type: "input",
      message: "What is the name of the department?",
      name: "answer2",
    }
  ],
  option3: [
    {
      type: "list",
      choices: ["YES", "NO"],
      message: "Would you like to start again?",
      name: "answer3",
    }
  ]
};

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
    startOver()
  });
};

const viewAllRoles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    startOver()
  });
};

const viewAllEmployees = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    startOver()
  });
};

const addADepartment = () => {
  inquirer.prompt(prompts.option2)

  .then((answers) => {
    db.query(`INSERT INTO department(name) VALUES("${answers.answer2}")`)
    startOver()
});

}
const addARole = () => {
  inquirer.prompt(prompts.option)
  startOver()
};

const addAnEmployee = () => {
  inquirer.prompt(prompts.option)
  startOver()
};

const updateAnEmployeeRole = () => {
  inquirer.prompt(prompts.option2)
  startOver()
};

const startOver = ( ) => {
  inquirer.prompt(prompts.option3)
  .then((answers) => {
    if (answers.answer3 === "YES") {
      appBegin()
    } else if (answers.answer3 === "NO") {
      console.log("Thank you for your time.")
    }
  })
};
appBegin();
