const mysql = require("mysql");
let connection = mysql.createConnection({
  //creating a connection
  host: "localhost",
  user: "root",
  password: "",
  database: "TheRollNumber",
});
connection.connect((err) => {
  // connecting to the database
  if (!err) {
    console.log("Database is connected");
  } else {
    console.log("Error while connecting with database");
  }
});
module.exports = connection;
