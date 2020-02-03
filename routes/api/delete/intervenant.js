const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//delete type_equipement
router.post('/',(req,res) => {
  const del = { matricule: req.body.matricule };
  var sql_query = "DELETE FROM Intervenant WHERE matricule=?";
  var values = [[del.matricule]];
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
