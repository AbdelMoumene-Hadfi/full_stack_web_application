import React from "react";
import Navbar from "./navbar"
import "./Style/addproduit_style.css";
import {addStock} from "./Function/AddstockFunction";


class Addstock extends React.Component {
  constructor() {
    super();
    this.state = {libelle_produit : '' , nu_serie : '' , marque_produit : '' , quantite_existante : '' , quantite_alert : '' , emplacement : '' , errors : '' , insert : false};
  }
  componentWillMount() {
    if(typeof localStorage.usertoken == 'undefined')
      {this.props.history.push(`/`);return ;}
    //
    const type  = localStorage.typeconn ;
    if(type !== "interv")
      {this.props.history.push(`/`);return ;}
  }
  onChange(e) {this.setState({[e.target.name] : e.target.value});}
  onSubmit(e) {
    e.preventDefault();
    const produit = {libelle_produit : this.state.libelle_produit , nu_serie : this.state.nu_serie , marque_produit : this.state.marque_produit , quantite_existante : this.state.quantite_existante , quantite_alert : this.state.quantite_alert , emplacement : this.state.emplacement};
    addStock(produit)
      .then((res) => {
        if (res) {this.setState({ errors : '' , insert : true});}
        })
      .catch((err) => {this.setState({ errors : err});})
  }
  render() {
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="container">
          <div className="breadcrumb_section">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Stock</li>
                <li className="breadcrumb-item active" aria-current="page">Ajouter_Element</li>
              </ol>
            </nav>
          </div>
          <form   onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              {(this.state.insert === true) ? (<div className="alert alert-primary" role="alert">Equipement ajouter</div>) : (<div></div>) }
            </div>
            <div className="form-group">
              <label htmlFor="InputLibelle">Libelle produit :</label>
              <input type="text" className="form-control" id="InputLibelle"  name="libelle_produit" placeholder="Enter produit libelle" value={this.state.libelle_produit} onChange={this.onChange.bind(this)} />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputNu_serie">Numero de Serie :</label>
                  <input type="text" className="form-control" id="InputNu_serie" name="nu_serie" placeholder="Numero de serie" value={this.state.nu_serie} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputMarqueprod">Marque produit :</label>
                  <input type="text" className="form-control" id="InputMarqueprod" name="marque_produit" placeholder="Marque produit" value={this.state.marque_produit} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputQuant_init">quantite initiale :</label>
                  <input type="text" className="form-control" id="InputQuant_init" name="quantite_existante" placeholder="Quantite initiale" value={this.state.quantite_existante} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputQuant_aler">quantite d'alerte :</label>
                  <input type="text" className="form-control" id="InputQuant_aler" name="quantite_alert" placeholder="quantite d'alerte" value={this.state.quantite_alert} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="InputEmp">Emplacement :</label>
              <input type="text" className="form-control" id="InputEmp" name="emplacement" placeholder="Emplacement" value={this.state.emplacement} onChange={this.onChange.bind(this)}/>
            </div>
            <div className="form-group">
              {(this.state.errors !== '') ? (<div className="text-danger center_alert">{this.state.errors.toString()}</div>) : (<div></div>) }
            </div>
            <div className="center_alert ">
              <button type="submit" className="btn btn-primary ">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Addstock;
