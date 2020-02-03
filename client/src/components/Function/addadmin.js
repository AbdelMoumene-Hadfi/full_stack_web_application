import React from "react";
import Navbar from "./navbar"
import "./Style/addintervenant&admin_style.css";
import {addAdmin} from "./Function/Addintervenant&adminFunction";


class Addadmin extends React.Component {
  constructor() {
    super();
    this.state = {user : '' , nom_admin : '' , prenom_admin : '' ,  passsword_admin : '' , rpassword : '' , file : null ,  errors : '' , insert : false };
  }
  componentWillMount() {
    if(typeof localStorage.usertoken == 'undefined')
      {this.props.history.push(`/`);return ;}
  }
  onChange(e) {
    if(e.target.name === "file" ) {
      this.setState({[e.target.name] : e.target.files[0]});}
    else {
      this.setState({[e.target.name] : e.target.value});}
  }
  onSubmit(e) {
    e.preventDefault();
    const admin = {user : this.state.user , nom_admin : this.state.nom_admin , prenom_admin : this.state.prenom_admin ,  passsword_admin : this.state.passsword_admin , rpassword : this.state.rpassword , file :  this.state.file};
    addAdmin(admin)
      .then((res) => {
        if (res) {this.setState({ errors : '' , insert : true});}
        })
      .catch((err) => {this.setState({ errors : err , insert : false});})
  }
  render() {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="container">
          <div className="breadcrumb_section_intervenant">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Administrateur</li>
                <li className="breadcrumb-item active" aria-current="page">Ajouter Admin</li>
              </ol>
            </nav>
          </div>
          <form   onSubmit={this.onSubmit.bind(this)} enctype="multipart/form-data">
            <div className="form-group">
            {(this.state.insert === true) ? (<div className="alert alert-primary" role="alert">Administrateur ajouter</div>) : (<div></div>) }
            </div>
            <div className="form-group">
              <label htmlFor="InputUser">user :</label>
              <input type="text" className="form-control" id="InputUser"  name="user" placeholder="Enter user" value={this.state.user} onChange={this.onChange.bind(this)} />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputNom">Nom :</label>
                  <input type="text" className="form-control" id="InputNom" name="nom_admin" placeholder="Enter nom" value={this.state.nom_admin} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputPrenom">Prenom :</label>
                  <input type="text" className="form-control" id="InputPrenom" name="prenom_admin" placeholder="Enter Prenom" value={this.state.prenom_admin} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputPassword">Password :</label>
                  <input type="password" className="form-control" id="InputPassword" name="passsword_admin" placeholder="Enter Password" value={this.state.Password} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputRpassword">Repeat password :</label>
                  <input type="password" className="form-control" id="InputRpassword" name="rpassword" placeholder="Repeat Password" value={this.state.rpassword} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="InputFile">Image :</label>
              <input type="file" className="form-control-file" id="InputFile" name="file" placeholder="Enter image" value={this.state.file} onChange={this.onChange.bind(this)}/>
            </div>
            <div className="form-group">
              {(this.state.errors !== '') ? (<div className="text-danger center_alert">{this.state.errors.toString()}</div>) : (<div></div>) }
            </div>
            <div className="center_alert">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Addadmin;
