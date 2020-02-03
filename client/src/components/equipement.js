import React from "react";
import {Link} from "react-router-dom";
import "./Style/equipement_style.css";

class Equipement extends React.Component {
  constructor() {
    super();
    this.state = {type : ''};
  }
  componentWillMount() {
    if(typeof localStorage.usertoken == 'undefined')
      {this.props.history.push(`/`);return ;}
    //
    this.setState({type : localStorage.typeconn})

  }
  render() {
    return (
        <div >
          {(this.state.type === "interv") ? (
          <div className="container_content_int">
            <div className="content_element_equip">
              <Link to="/equipement/Add"><button className="btn btn-primary">ajouter equipement</button></Link>
            </div>
            <div className="content_element_equip">
              <Link to="/equipement/show"><button className="btn btn-primary">afficher equipement</button></Link>
            </div>
            <div className="content_element_equip">
              <Link to="/equipement/taux"><button className="btn btn-primary">taux d'utilisation d'equipement</button></Link>
            </div>
          </div>
          ) :
          (<div className="container_content_int">
            <div className="content_element_equip">
              <Link to="/equipement/delete"><button className="btn btn-primary">supprimer equipement</button></Link>
            </div>
          </div>
          )}
        </div>



  );


 }
}

export default Equipement ;
