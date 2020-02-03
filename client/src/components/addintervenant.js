import React from "react";
import Navbar from "./navbar"
import "./Style/addintervenant&admin_style.css";
import {addIntervenant} from "./Function/Addintervenant&adminFunction";


class Addintervenant extends React.Component {
  constructor() {
    super();
    this.state = {matricule : '' , nom : '' , prenom : '' , millieu_travaille : '' , fonction : '' , mot_passe : '' , rmot_passe : '' , errors : '' , insert : false };
  }
  componentWillMount() {
    if(typeof localStorage.usertoken == 'undefined')
      {this.props.history.push(`/`);return ;}
  }
  onChange(e) {this.setState({[e.target.name] : e.target.value});}
  onSubmit(e) {
    e.preventDefault();
    const intervenant = {matricule : this.state.matricule , nom : this.state.nom , prenom : this.state.prenom , millieu_travaille : this.state.millieu_travaille , fonction : this.state.fonction , mot_passe : this.state.mot_passe , rmot_passe : this.state.rmot_passe };
    addIntervenant(intervenant)
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
                <li className="breadcrumb-item">Intervenant</li>
                <li className="breadcrumb-item active" aria-current="page">Ajouter Intervenant</li>
              </ol>
            </nav>
          </div>
          <form   onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
            {(this.state.insert === true) ? (<div className="alert alert-primary" role="alert">Intervenant ajouter</div>) : (<div></div>) }
            </div>
            <div className="form-group">
              <label htmlFor="InputMatricule">Matricule :</label>
              <input type="text" className="form-control" id="InputMatricule"  name="matricule" placeholder="Enter matricule" value={this.state.matricule} onChange={this.onChange.bind(this)} />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputNom">Nom :</label>
                  <input type="text" className="form-control" id="InputNom" name="nom" placeholder="Enter nom" value={this.state.nom} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputPrenom">Prenom :</label>
                  <input type="text" className="form-control" id="InputPrenom" name="prenom" placeholder="Enter Prenom" value={this.state.prenom} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputMillieu">Millieu de travaille:</label>
                  <input type="text" className="form-control" id="InputMillieu" name="millieu_travaille" placeholder="Enter millieu travaille" value={this.state.millieu_travaille} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputFonction">Fonction :</label>
                  <input type="text" className="form-control" id="InputFonction" name="fonction" placeholder="Enter Fonction" value={this.state.fonction} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputPassword">Password :</label>
                  <input type="password" className="form-control" id="InputPassword" name="mot_passe" placeholder="Enter Password" value={this.state.mot_passe} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputRpassword">Repeat password :</label>
                  <input type="password" className="form-control" id="InputRpassword" name="rmot_passe" placeholder="Repeat Password" value={this.state.rmot_passe} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
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

export default Addintervenant;
