const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//create type_equip
router.post('/',(req,res) => {
  const newTypeEquip = {nom_type : req.body.nom_type};
  if(!newTypeEquip.nom_type )
    {return res.status(400).json({ msg : 'please include all entry'}) ;}
  var sql_query = "SELECT * FROM Type_Equip";
  connection.query(sql_query , (err,result,fields) => {
      if (err) {
        res.status(400).json({msg:`error ${err.stack}`});
        return ;
      }
      type_exist = result.find((element) => {return element.nom_type == newTypeEquip.nom_type ;});
      if(type_exist)
        {res.status(400).json({msg:`type equipement  "${newTypeEquip.nom_type}" already exist`});
         return ;
        }
      var sql_query = "INSERT INTO Type_Equip VALUES ?";
      var values = [[newTypeEquip.nom_type]];
      connection.query(sql_query ,[values],(err,result) => {
        if (err) {
          res.status(400).json({msg:`error in inserting , Type error :  ${err.sqlMessage}`});
          return ;
          }
        res.json({msg:'inserted'});
        return ;
      });
  });
});

//
module.exports = router ;
