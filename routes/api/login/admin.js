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
  const infoAdmin = { user : req.body.user ,  password_Admin : req.body.password_Admin };
  //Check if user enter all information
  if(!infoAdmin.user  || !infoAdmin.password_Admin)
    {return res.status(401).json({ msg : 'please enter your user and password'}) ;}
  //Search in database for user
  var sql_query = "SELECT * FROM Admin WHERE user=?";
  connection.query(sql_query ,[[infoAdmin.user]], (err,result,fields) => {
      if (err) {
        res.status(404).json({msg:`error ${err.stack}`});
        return ;
      }
      if(result.length == 0)
        {res.status(401).json({msg:`user not found`});
         return ;
        }
      if(infoAdmin.password_Admin != result[0].passsword_Admin)
        {res.status(401).json({msg:'password does not match'});
        return ;}
      let token = jwt.sign({data : result[0]},process.env.SECRET_KEY,{expiresIn : 2000});
      //res.json({msg:'password matched'});
      res.send(token);
      });
  });
//Export Part
module.exports = router ;
