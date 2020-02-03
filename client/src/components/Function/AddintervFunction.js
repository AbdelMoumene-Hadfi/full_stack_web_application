import axios from 'axios' ;

export const addInterv_prev = (interv) => {
  return axios
      .post('/api/insert/interv_prev',{N_maintenance : interv.N_maintenance ,date_heure_maintenance : interv.date_heure_maintenance , procedure_maintenance : interv.procedure_maintenance , remarque_maintenance : interv.remarque_maintenance ,temps_arret : interv.temps_arret ,temps_maint : interv.temps_maint ,libelle_equip : interv.libelle_equip ,intervenant : interv.intervenant , stock : interv.stock })
      .then((res) => {

        return res.data.msg ;})
      .catch((err) => {

        throw Error (err.response.data.msg);

        })

}

export const addInterv_cor = (interv) => {
  return axios
      .post('/api/insert/interv_cor',{N_maintenance : interv.N_maintenance ,date_heure_maintenance : interv.date_heure_maintenance , procedure_maintenance : interv.procedure_maintenance , panne : interv.panne, remarque_maintenance : interv.remarque_maintenance ,temps_arret : interv.temps_arret ,temps_maint : interv.temps_maint ,libelle_equip : interv.libelle_equip ,intervenant : interv.intervenant , stock : interv.stock })
      .then((res) => {

        return res.data.msg ;})
      .catch((err) => {

        throw Error (err.response.data.msg);

        })

}
