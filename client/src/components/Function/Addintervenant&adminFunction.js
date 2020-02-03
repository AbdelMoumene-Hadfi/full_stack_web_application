import axios from 'axios' ;

export const addIntervenant = (intervenant) => {
  return axios
      .post('/api/insert/intervenant',{matricule : intervenant.matricule , nom : intervenant.nom , prenom : intervenant.prenom , millieu_travaille : intervenant.millieu_travaille , fonction : intervenant.fonction , mot_passe : intervenant.mot_passe , rmot_passe : intervenant.rmot_passe  })
      .then((res) => {

        return res.data.msg ;})
      .catch((err) => {

        throw Error (err.response.data.msg);

        })

}

export const addAdmin = (admin) => {
  return axios
      .post('/api/insert/admin',{user : admin.user , nom_admin : admin.nom_admin , prenom_admin : admin.prenom_admin ,  passsword_admin : admin.passsword_admin , rpassword : admin.rpassword , file :  admin.file})
      .then((res) => {

        return res.data.msg ;})
      .catch((err) => {

        throw Error (err.response.data.msg);

        })

}
