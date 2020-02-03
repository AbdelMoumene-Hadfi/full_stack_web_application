import axios from 'axios' ;

export const loginasadmin = (admin) => {
  return axios
      .post('/api/login/admin',{user : admin.user ,
                                password_Admin : admin.password_Admin })
      .then((res) => {
        localStorage.setItem('usertoken',res.data);
        localStorage.setItem('typeconn',"admin");
        return res.data ;})
      .catch((err) => {
        if(err.response.status === 404 )
          {console.log(err.response.data.msg);}
        else if(err.response.status === 401)
         {throw Error (err.response.data.msg);
          }
        })

}
export const loginasinterv = (interv) => {
  return axios
      .post('/api/login/interv',{matricule : interv.matricule ,
                                password_interv: interv.password_interv })
      .then((res) => {
        localStorage.setItem('usertoken',res.data);
        localStorage.setItem('typeconn',"interv");
        return res.data ;})
      .catch((err) => {
        if(err.response.status === 404 )
          {console.log(err.response.data.msg);}
        else if(err.response.status === 401)
         {throw Error (err.response.data.msg);
          }
        })

}
