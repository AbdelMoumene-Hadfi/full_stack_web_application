import React from "react";
import {Link} from "react-router-dom";
import "./Style/equipement_style.css";

class Intervenant extends React.Component {
  render() {
    return (
        <div className="container_content_int">

            <div className="content_element_equip">
              <Link to="/intervenant/Add"><button className="btn btn-primary">ajouter intervenant</button></Link>
            </div>
            <div className="content_element_equip">
              <Link to="/intervenant/show"><button className="btn btn-primary">afficher intervenant</button></Link>
            </div>

            <div className="content_element_equip">
              <Link to="/intervenant/delete"><button className="btn btn-primary">supprimer intervenant</button></Link>
            </div>
          
        </div>



  );


 }
}

export default Intervenant ;
