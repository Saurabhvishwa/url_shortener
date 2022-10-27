const mysql = require("mysql");

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

con.connect((error) => {
  if (error) console.log(error);
  console.log("Connection Established");
});

module.exports = con;
