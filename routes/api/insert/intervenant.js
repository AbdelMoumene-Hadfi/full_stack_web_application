const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//create admin
router.post('/',(req,res) => {
  const newIntervenant = {matricule : req.body.matricule , nom : req.body.nom , prenom : req.body.prenom , millieu_travaille : req.body.millieu_travaille , fonction : req.body.fonction , mot_passe : req.body.mot_passe , rmot_passe : req.body.rmot_passe };
  if(!newIntervenant.matricule || !newIntervenant.nom  || !newIntervenant.prenom || !newIntervenant.millieu_travaille || !newIntervenant.fonction || !newIntervenant.mot_passe || !newIntervenant.rmot_passe )
    {return res.status(400).json({ msg : 'please include all entry'}) ;}

  if(newIntervenant.mot_passe !== newIntervenant.rmot_passe )
    {return res.status(400).json({ msg : 'password doesn\'t match'}) ;}
  var sql_query = "SELECT * FROM Intervenant";
  connection.query(sql_query , (err,result,fields) => {
      if (err) {
        res.json({msg:`error ${err.stack}`});
        return ;
      }
      var intervenant_exist = result.find((element) => {return element.matricule==newIntervenant.matricule ;});
      if(intervenant_exist)
        {res.json({msg:`Intervenant : ${newIntervenant.matricule} already exist`});
         return ;
        }
      var sql_query = "INSERT INTO Intervenant VALUES ?";
      var values = [[newIntervenant.matricule,newIntervenant.nom,newIntervenant.prenom,newIntervenant.millieu_travaille,newIntervenant.fonction,newIntervenant.mot_passe]];
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
