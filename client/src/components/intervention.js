import React from "react";
import {Link} from "react-router-dom";
import "./Style/intervention_style.css";

class Intervention extends React.Component {
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
            <div className="content_element_int">
              <Link to="/intervention/addinterv_prev"><button className="btn btn-primary">ajouter intervention preventive</button></Link>
            </div>
            <div className="content_element_int">
              <Link to="/intervention/addinterv_cor"><button className="btn btn-primary">ajouter intervention corrective</button></Link>
            </div>
            <div className="content_element_int">
              <Link to="/intervention/showall"><button className="btn btn-primary">afficher les interventions </button></Link>
            </div>
            <div className="content_element_int">
              <Link to="/intervention/show"><button className="btn btn-primary">afficher  intervention </button></Link>
            </div>
          </div>
          ) :
          (<div className="container_content_int">
            <div className="content_element_int">
              <Link to="/intervention/delete"><button className="btn btn-primary">supprimer  intervention </button></Link>
            </div>
          </div>
          )}


        </div>



  );


 }
}

export default Intervention ;
