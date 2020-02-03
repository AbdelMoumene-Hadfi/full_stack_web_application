const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//create admin
router.post('/',(req,res) => {
  const newAdmin = { user : req.body.user , nom_Admin : req.body.nom_Admin , prenom_Admin : req.body.prenom_Admin , passsword_Admin : req.body.passsword_Admin , rpassword : req.body.rpassword , file :  req.body.file};
  if(!newAdmin.user || !newAdmin.nom_Admin || !newAdmin.prenom_Admin || !newAdmin.passsword_Admin )
    {return res.status(400).json({ msg : 'please include user and name and password'}) ;}
  var sql_query = "SELECT * FROM Admin";
  connection.query(sql_query , (err,result,fields) => {
      if (err) {
        res.json({msg:`error ${err.stack}`});
        return ;
      }
      var admin_exist = result.find((element) => {return element.user==newAdmin.user ;});
      if(admin_exist)
        {res.json({msg:`user : ${newAdmin.user} already exist`});
         return ;
        }
      var sql_query = "INSERT INTO Admin VALUES ?";
      var values = [[newAdmin.user,newAdmin.nom_Admin,newAdmin.prenom_Admin,newAdmin.password_Admin]];
      connection.query(sql_query ,[values],(err,result) => {
        if (err) {
          res.json({msg:`error in inserting , Type error :  ${err.sqlMessage}`});
          return ;
          }
        res.json({msg:'inserted'});
        return ;
      });
  });
});

//
module.exports = router ;
