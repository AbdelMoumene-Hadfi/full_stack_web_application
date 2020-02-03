const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//create produit
router.post('/',(req,res) => {
  const newProduit = { libelle_produit : req.body.libelle_produit , nu_serie : req.body.nu_serie , marque_produit : req.body.marque_produit , quantite_ajouter : req.body.quantite_ajouter  , emplacement : req.body.emplacement};
  if(!newProduit.libelle_produit || !newProduit.nu_serie || !newProduit.marque_produit || !newProduit.quantite_ajouter  || !newProduit.emplacement )
    {return res.status(400).json({ msg : 'please include all entry'}) ;}
  var sql_query = "SELECT * FROM Stock where libelle_produit=?";
  var values = [newProduit.libelle_produit];
  connection.query(sql_query ,[values], (err,result,fields) => {
      if (err) {
        res.status(400).json({msg:`error ${err.sqlMessage}`});
        return ;
      }
      if(!result)
        {res.status(400).json({msg:`produit  "${newProduit.libelle_produit}" not exist`});
         return ;
        }
      var sql_query = "UPDATE Stock SET quantite_existante = quantite_existante + ? where libelle_produit = ?  ";
      var values = [newProduit.quantite_ajouter,newProduit.libelle_produit];
      connection.query(sql_query ,values,(err,result) => {
        if (err) {
          res.status(400).json({msg:`error in updating , Type error :  ${err.sqlMessage}`});console.log(err.sqlMessage);
          return ;
          }
        res.json({msg:'updated'});
        return ;
      });
  });
});

//
module.exports = router ;
