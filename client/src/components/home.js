import React from "react";
import {Link} from "react-router-dom";
import "./Style/home_style.css";


class  Home extends React.Component {
  componentDidMount() {
    if(typeof localStorage.usertoken != 'undefined')
      {this.props.history.push(`/dashboard`);return ;}
    }
  render(){
  return (
    <div className="container-fluid">
      <div className="section">
        <div className="section_title">
          Connecter en tant que :
        </div>
        <div className="section_element">
          <Link to="/sign_admin"><button className="btn btn-primary">Administrateur</button></Link>
        </div>
        <div className="section_element">
          <Link to="/sign_interv"><button className="btn btn-primary">intervenant</button></Link>
        </div>
      </div>
    </div>
  );
}
}
export default Home;
