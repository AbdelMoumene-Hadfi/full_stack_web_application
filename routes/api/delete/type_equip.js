const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//delete type_equipement
router.post('/',(req,res) => {
  const delTypeEquip = { nom_type: req.body.nom_type };
  var sql_query = "DELETE FROM Type_Equip WHERE nom_type=?";
  var values = [[delTypeEquip.nom_type]];
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
