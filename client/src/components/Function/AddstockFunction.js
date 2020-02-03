import axios from 'axios' ;

export const addStock = (produit) => {
  return axios
      .post('/api/insert/stock',{libelle_produit : produit.libelle_produit , nu_serie : produit.nu_serie , marque_produit : produit.marque_produit , quantite_existante : produit.quantite_existante , quantite_alert : produit.quantite_alert , emplacement : produit.emplacement })
      .then((res) => {return res ;})
      .catch((err) => {throw Error (err.response.data.msg);})
}
export const augmentStock = (produit) => {
  return axios
      .post('/api/insert/aug_stock',{libelle_produit : produit.libelle_produit , nu_serie : produit.nu_serie , marque_produit : produit.marque_produit , quantite_ajouter : produit.quantite_ajouter  , emplacement : produit.emplacement })
      .then((res) => {return res ;})
      .catch((err) => {throw Error (err.response.data.msg);})
}
