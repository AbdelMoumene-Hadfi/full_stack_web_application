const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//show stock
router.post('/',(req,res) => {
  var sql_query = "SELECT * FROM Stock where quantite_existante < quantite_alert";
  connection.query(sql_query , (err,result,fields) => {
      if (err) {
        res.status(400).json({msg:`error ${err.stack}`});
        return ;
      }
      res.json({msg:result});
      return ;
  });
});

//
module.exports = router ;
