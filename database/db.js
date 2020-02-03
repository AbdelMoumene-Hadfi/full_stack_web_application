const mysql = require('mysql') ;
var connection = mysql.createConnection({
  host : "localhost" ,
  user : "root" ,
  password : "password",
  database : "gestion_aero"
  });
connection.connect((err) => {
  if (err) {
    console.log('error connection : ' + err.stack );
    return ;
  }
  console.log("connected!");
});

module.exports = connection ;
