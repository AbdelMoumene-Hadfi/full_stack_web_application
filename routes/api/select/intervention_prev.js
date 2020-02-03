const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//show intervenant
router.post('/',(req,res) => {
  if(!req.body.N_maintenance) {
    var sql_query = "SELECT * FROM Intervention_preventive";
    connection.query(sql_query , (err,result,fields) => {
        if (err) {
          res.status(400).json({msg:`error ${err.stack}`});
          return ;}
        res.json({msg:result});
        return ;
    });}
  else {
    var sql_query = "SELECT * FROM Intervention_preventive where N_maintenance=?";
    connection.query(sql_query ,[[req.body.N_maintenance]], (err,result,fields) => {
        if (err) {
          res.status(400).json({msg:`error ${err.stack}`});
          return ;}
        res.json({msg:result});
        return ;
  });}
});

//
module.exports = router ;
