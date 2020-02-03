const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//create produit
router.post('/',(req,res) => {
  const newEquip = { libelle_equip : req.body.libelle_equip , type_equip : req.body.type_equip , marque_equip : req.body.marque_equip , endroit_installation : req.body.endroit_installation , documentation_equip : req.body.documentation_equip , date_aquisition : req.body.date_aquisition , duree_garentie : req.body.duree_garentie , remarque_equip : req.body.remarque_equip};
  if(!newEquip.libelle_equip || !newEquip.type_equip || !newEquip.marque_equip || !newEquip.endroit_installation || !newEquip.documentation_equip || !newEquip.date_aquisition || !newEquip.duree_garentie || !newEquip.remarque_equip )
    {return res.status(400).json({ msg : 'please include all entry'}) ;}
  var sql_query = "SELECT * FROM Equipement";
  connection.query(sql_query , (err,result,fields) => {
      if (err) {
        res.status(400).json({msg:`error ${err.stack}`});
        return ;
      }
      var equip_exist = result.find((element) => {return element.libelle_equip==newEquip.libelle_equip ;});
      if(equip_exist)
        {res.status(400).json({msg:`equipement : ${newEquip.libelle_equip} already exist`});
         return ;
        }
      var sql_query = "INSERT INTO Equipement VALUES ?";
      var values = [[newEquip.libelle_equip,newEquip.type_equip,newEquip.marque_equip,newEquip.endroit_installation,newEquip.documentation_equip,newEquip.date_aquisition,newEquip.duree_garentie,newEquip.remarque_equip]];
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
