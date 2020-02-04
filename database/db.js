const mysql = require('mysql') ;
var connection = mysql.createConnection({
  host : "localhost" ,
  user : "" , //puts her your user
  password : "", // puts her your password
  database : "" //puts her your database name
  });
connection.connect((err) => {
  if (err) {
    console.log('error connection : ' + err.stack );
    return ;
  }
  console.log("connected to database!");
});

module.exports = connection ;
