import axios from 'axios' ;

export const addTypeEquipe = (typeEquip) => {
  return axios.post('/api/insert/type_equip',{nom_type : typeEquip.nom_type })
              .then((res) => {return res.data.msg ;})
              .catch((err) => {throw Error (err.response.data.msg);})
}
