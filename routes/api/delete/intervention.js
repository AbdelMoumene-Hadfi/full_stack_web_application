const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//delete type_equipement
router.post('/',(req,res) => {
  const delInterv = { N_maintenance: req.body.N_maintenance };
  connection.beginTransaction((err) => {
    if (err) { res.status(400).json({msg:`error ${err.stack}`});return ; }
    var sql_query = "delete from Intervention_preventive where N_maintenance = ?";
    var values= [delInterv.N_maintenance];
    connection.query(sql_query ,[values],(err,result) => {
        if (err) {return connection.rollback(() =>
          {res.status(400).json({msg:`error in deleting, Type error :  ${err.sqlMessage}`});return ;});}
        var sql_query = "delete from Intervention_corrective where N_maintenance = ?";
        var values= [delInterv.N_maintenance];
        connection.query(sql_query ,[values],(err,result) => {
          if (err) {return connection.rollback(() =>
            {res.status(400).json({msg:`error in deleting, Type error :  ${err.sqlMessage}`});return ;});}
          var sql_query = "delete from Maintenace_intervenant where N_maintenance = ?";
          var values= [delInterv.N_maintenance];
          connection.query(sql_query ,[values],(err,result) => {
              if (err) {return connection.rollback(() =>
                {res.status(400).json({msg:`error in deleting maintenance_interventant, Type error :  ${err.sqlMessage}`});return ;});}
              var sql_query = "delete from Maintenace_produit where N_maintenance = ? ";
              var values= [delInterv.N_maintenance];
              connection.query(sql_query,[values],(error, results, fields) => {
                  if (err) {return connection.rollback(() =>
                    {res.status(400).json({msg:`error in deleting maintenance_stock, Type error :  ${err.sqlMessage}`});return ;});}
                  connection.commit(function(err) {
                    if (err) {return connection.rollback(() =>
                      {res.status(400).json({msg:`error in commit , Type error :  ${err.sqlMessage}`});return ;});}
                    res.json({msg:'deleted'});
                    return ;
                  });
              });
          });
        });
    });
  });
});
//
module.exports = router ;
