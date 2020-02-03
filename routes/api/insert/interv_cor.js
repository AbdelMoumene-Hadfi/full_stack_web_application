const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//create intervention
router.post('/',(req,res) => {
  const newInterv = {N_maintenance : req.body.N_maintenance ,date_heure_maintenance : req.body.date_heure_maintenance , procedure_maintenance : req.body.procedure_maintenance , panne : req.body.panne, remarque_maintenance : req.body.remarque_maintenance ,temps_arret : req.body.temps_arret ,temps_maint : req.body.temps_maint ,libelle_equip : req.body.libelle_equip ,intervenant : req.body.intervenant , stock : req.body.stock};
  if(!newInterv.N_maintenance || !newInterv.date_heure_maintenance || !newInterv.procedure_maintenance || !newInterv.remarque_maintenance || !newInterv.panne || !newInterv.temps_arret || !newInterv.temps_maint || !newInterv.libelle_equip || !newInterv.intervenant  || !newInterv.stock )
    {return res.status(400).json({ msg : 'please include all entry'}) ;}
  var sql_query = "SELECT N_maintenance FROM Intervention_corrective UNION SELECT N_maintenance FROM Intervention_preventive ";
  connection.query(sql_query , (err,result,fields) => {
      if (err) {
        res.status(400).json({msg:`error ${err.stack}`});
        return ;
      }
      var interv_exist = result.find((element) => {return element.N_maintenance==newInterv.N_maintenance ;});
      if(interv_exist)
        {res.stattus(400).json({msg:`Intervention : ${newInterv.N_maintenance} already exist`});
         return ;
      }
      //
      connection.beginTransaction((err) => {
        if (err) { res.status(400).json({msg:`error ${err.stack}`});return ; }
        var sql_query = "INSERT INTO Intervention_corrective VALUES ?";
        values = [[newInterv.N_maintenance,newInterv.date_heure_maintenance,newInterv.procedure_maintenance,newInterv.panne,newInterv.remarque_maintenance,newInterv.temps_arret,newInterv.temps_maint,newInterv.libelle_equip]];

        connection.query(sql_query,[values],(error, results, fields) => {
          if (err) {return connection.rollback(() =>
            {res.status(400).json({msg:`error in inserting Intervention_preventive, Type error :  ${err.sqlMessage}`});return ;});}
          var sql_query = "INSERT INTO Maintenace_intervenant VALUES ?";
          var values= [];
          for(let i=0;i<newInterv.intervenant.length;i++)
            {values.push([newInterv.N_maintenance,newInterv.intervenant[i]]);}

          connection.query(sql_query ,[values],(err,result) => {
            if (err) {return connection.rollback(() =>
              {res.status(400).json({msg:`error in inserting interventant, Type error :  ${err.sqlMessage}`});return ;});}
            var sql_query = "INSERT INTO Maintenace_produit VALUES ?";
            var values= [];
            for(let i=0;i<newInterv.stock.length;i++)
              {values.push([newInterv.N_maintenance,newInterv.stock[i][0],newInterv.stock[i][1]]);
               var sql_query2 = "UPDATE Stock SET quantite_existante=quantite_existante-? where libelle_produit=?";

               connection.query(sql_query2 ,[parseInt(newInterv.stock[i][1],10),newInterv.stock[i][0]],(err,result) => {
                 if (err) {return connection.rollback(() =>
                   {console.log(err);res.status(400).json({msg:`error in updating , Type error :  ${err.sqlMessage}`});return ;});}})
              }
            connection.query(sql_query,[values],(error, results, fields) => {
              if (err) {return connection.rollback(() =>
                  {res.status(400).json({msg:`error in inserting  stock, Type error :  ${err.sqlMessage}`});return ;});}
              connection.commit(function(err) {
                if (err) {return connection.rollback(() =>
                  {res.status(400).json({msg:`error in commit , Type error :  ${err.sqlMessage}`});return ;});}
                res.json({msg:'inserted'});
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
