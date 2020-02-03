import axios from 'axios' ;

export const addEquip = (equip) => {
  return axios
      .post('/api/insert/equipement',{libelle_equip : equip.libelle_equip , type_equip : equip.type_equip , marque_equip : equip.marque_equip , endroit_installation : equip.endroit_installation , documentation_equip : equip.documentation_equip , date_aquisition : equip.date_aquisition , duree_garentie : equip.duree_garentie , remarque_equip : equip.remarque_equip })
      .then((res) => {

        return res.data.msg ;})
      .catch((err) => {

        throw Error (err.response.data.msg);

        })

}
