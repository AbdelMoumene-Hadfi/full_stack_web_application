import React from "react";
import jwt_decode from 'jwt-decode';
import Navbar from "./navbar" ;
//import {Link , withRouter } from "react-router-dom";
import "./Style/setting_style.css";

class Settingadmin extends React.Component {
  constructor() {
    super();
    this.state = {user: '' ,nom : '' , prenom : '' , password : '' ,image_url : '' };
  }
  componentWillMount() {
    if(typeof localStorage.usertoken == 'undefined')
      {this.props.history.push(`/`);return ;}
  }
  componentDidMount() {
    if(typeof localStorage.usertoken !== 'undefined'){
    const token = localStorage.usertoken ;
    const decoded_token = jwt_decode(token);
    this.setState({user : decoded_token.data.user ,nom : decoded_token.data.nom_Admin , prenom : decoded_token.data.prenom_Admin , password : decoded_token.data.password, image_url : decoded_token.data.image_url})}
  }
  onChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }
  render() {
    return (
      <div className="container-fluid">
        <Navbar />

        <div className="container">
          <div className="breadcrumb_section_equip">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item active" aria-current="page">Setting</li>
              </ol>
            </nav>
          </div>
          <div className="col-2 image_user">
              <img src={this.state.image_url} alt="user_image" />
          </div>

        </div>
      </div>
    );
  }
}

export default Settingadmin;
