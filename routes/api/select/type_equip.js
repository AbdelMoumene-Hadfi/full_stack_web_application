const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//show produit
router.post('/',(req,res) => {
  var sql_query = "SELECT * FROM Type_Equip";
  connection.query(sql_query , (err,result,fields) => {
      if (err) {
        res.status(400).send(`error ${err.stack}`);
        return ;
      }
      res.send(result);
      return ;
  });
});

//
module.exports = router ;
