const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//create produit
router.post('/',(req,res) => {
  const newProduit = { libelle_produit : req.body.libelle_produit , nu_serie : req.body.nu_serie , marque_produit : req.body.marque_produit , quantite_existante : req.body.quantite_existante , quantite_alert : req.body.quantite_alert , emplacement : req.body.emplacement};
  if(!newProduit.libelle_produit || !newProduit.nu_serie || !newProduit.marque_produit || !newProduit.quantite_existante || !newProduit.quantite_alert  || !newProduit.emplacement )
    {return res.status(400).json({ msg : 'please include all entry'}) ;}
  var sql_query = "SELECT * FROM Stock";
  connection.query(sql_query , (err,result,fields) => {
      if (err) {
        res.status(400).json({msg:`error ${err.stack}`});
        return ;
      }
      produit_exist = result.find((element) => {return element.libelle_produit==newProduit.libelle_produit ;});
      if(produit_exist)
        {res.status(400).json({msg:`produit  "${newProduit.libelle_produit}" already exist`});
         return ;
        }
      var sql_query = "INSERT INTO Stock VALUES ?";
      var values = [[newProduit.libelle_produit,newProduit.nu_serie,newProduit.marque_produit,newProduit.quantite_existante,newProduit.quantite_alert,newProduit.emplacement]];
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
