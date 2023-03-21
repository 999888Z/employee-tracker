// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer')

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: "",
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// // Query database
// db.query('SELECT * FROM employee', function (err, results) {
//   console.log(results);
// });
// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const prompts = {
  option1: [{
    type: "list",
    message: "What would you like to do?",
    choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"],
    name: "answer1" 
  }]
}

const appBegin = () => {
 inquirer.prompt(prompts.option1)

  .then((answers) => {
    if (answers.answer1 === "View All Departments") {
      viewAllDepartments()
    } else if (answers.answer1 === "View All Roles") {
      viewAllRoles()
    } else if (answers.answer1 === "View All Employees") {
      viewAllEmployees()
    } else if (answers.answer1 === "Add a Department") {
      addADepartment()
    } else if (answers.answer1 === "Add a Role") {
      addARole()
    } else if (answers.answer1 === "Add an Employee") {
      addAnEmployee()
    } else {
      updateAnEmployeeRole()
    }
  })
}

const viewAllDepartments = () => {

}

const viewAllRoles = () => {

}

const viewAllEmployees = () => {

}

const addADepartment = () => {

}

const addARole = () => {

}

const addAnEmployee = () => {

}

const updateAnEmployeeRole = () => {

}


appBegin()