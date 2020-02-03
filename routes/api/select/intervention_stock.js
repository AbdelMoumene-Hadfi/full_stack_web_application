const express= require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
var connection = require('../../../database/db');

//show intervenant
router.post('/',(req,res) => {
    var sql_query = "SELECT * FROM Maintenace_produit,Stock where Maintenace_produit.libelle_produit=Stock.libelle_produit and Maintenace_produit.N_maintenance=?";
    connection.query(sql_query ,[[req.body.N_maintenance]], (err,result,fields) => {
        if (err) {
          res.status(400).json({msg:`error ${err.stack}`});
          return ;}
        res.json({msg:result});
        return ;
  });
});

//
module.exports = router ;
