import React from "react";
import jwt_decode from 'jwt-decode';
import {Link , withRouter } from "react-router-dom";
import "./Style/navbar_style.css";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {nom : '' , prenom : '' };
  }
  logout(e) {
    e.preventDefault();
    localStorage.removeItem('usertoken');
    localStorage.removeItem('typeconn');
    this.props.history.push('/');
  }
  componentDidMount() {
    if(typeof localStorage.usertoken !== 'undefined'){
      const token = localStorage.usertoken ;
      const type  = localStorage.typeconn ;
      const decoded_token = jwt_decode(token);
      if(type === "admin")
        {this.setState({nom : decoded_token.data.nom_Admin , prenom : decoded_token.data.prenom_Admin })}
      else if(type === "interv")
        {this.setState({nom : decoded_token.data.nom , prenom : decoded_token.data.prenom })}
    }
  }
  render () {
    return(
      <div className="navbar">
        <div className="navbar_user">
          <div className="navbar_nom">
            <h1>{this.state.nom} {this.state.prenom}</h1>
          </div>
        </div>
        <div className="navbar_list ">
          <div className="navbar_element">
            <Link to="/dashboard" ><h1>Home</h1></Link>
          </div>
          <div className="navbar_border" />
          <div className="navbar_element">
            <h1 onClick={this.logout.bind(this)}>logout</h1>
          </div>
        </div>
      </div>
  );
}
}
export default withRouter(Navbar);
