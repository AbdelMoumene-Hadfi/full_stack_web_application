const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//delete type_equipement
router.post('/',(req,res) => {
  const delEquip = { libelle_equip: req.body.libelle_equip };
  var sql_query = "DELETE FROM Equipement WHERE libelle_equip=?";
  var values = [[delEquip.libelle_equip]];
  connection.query(sql_query ,[values],(err,result) => {
    if (err) {
      res.status(400).json({msg:`error in deleting , Type error :  ${err.sqlMessage} `});
      return ;
    }
      res.json({msg:'deleted'});
      return ;
  });

});

//
module.exports = router ;
