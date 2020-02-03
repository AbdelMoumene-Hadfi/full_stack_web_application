//Import Part
const express= require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cors = require('cors');
var connection = require('../../../database/db');
router.use(cors());
process.env.SECRET_KEY = 'secret' ;

//Connect admin
router.post('/',(req,res) => {
  console.log("request");
  const infoInterv = { matricule : req.body.matricule ,  password_interv : req.body.password_interv };
  //Check if user enter all information
  if(!infoInterv.matricule  || !infoInterv.password_interv)
    {return res.status(401).json({ msg : 'please enter your user and password'}) ;}
  //Search in database for user
  var sql_query = "SELECT * FROM Intervenant WHERE matricule=?";
  connection.query(sql_query ,[[infoInterv.matricule]], (err,result,fields) => {
      if (err) {
        res.status(404).json({msg:`error ${err.stack}`});
        return ;
      }
      if(result.length == 0)
        {res.status(401).json({msg:`matricule not found`});
         return ;
        }
      if(infoInterv.password_interv != result[0].mot_passe)
        {res.status(401).json({msg:'password does not match'});
        return ;}
      let token = jwt.sign({data : result[0]},process.env.SECRET_KEY,{expiresIn : 2000});
      //res.json({msg:'password matched'});
      res.send(token);
      });
  });
//Export Part
module.exports = router ;
