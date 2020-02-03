import React from "react";
import axios from 'axios' ;
import Navbar from "./navbar"
import "./Style/addequip_style.css";
import {addEquip} from "./Function/AddequipFunction";


class Addequip extends React.Component {
  constructor() {
    super();
    this.state = {libelle_equip : '' , type_equip : '' , marque_equip : '', endroit_installation : '', documentation_equip : '', date_aquisition : '', duree_garentie : '', remarque_equip : '', errors : '' , insert : false , emp : {}};
  }
  componentWillMount() {
    if(typeof localStorage.usertoken == 'undefined')
      {this.props.history.push(`/`);return ;}
    const type  = localStorage.typeconn ;
    if(type !== "interv")
      {this.props.history.push(`/`);return ;}
  }
  componentDidMount() {
    axios.post('/api/select/type_equip')
         .then((res) => {this.setState({emp : res.data})})
         .catch((err) => {console.log(err);}) }
  onChange(e) {this.setState({[e.target.name] : e.target.value});}
  onSubmit(e) {
    e.preventDefault();
    const equip = {libelle_equip : this.state.libelle_equip , type_equip : this.state.type_equip , marque_equip : this.state.marque_equip , endroit_installation : this.state.endroit_installation , documentation_equip : this.state.documentation_equip , date_aquisition : this.state.date_aquisition , duree_garentie : this.state.duree_garentie , remarque_equip : this.state.remarque_equip};
    addEquip(equip)
      .then((res) => {
        if (res) {this.setState({ errors : '' , insert : true});}
        })
      .catch((err) => {this.setState({ errors : err});})
  }
  render() {
    let option_line ;
    if(typeof this.state.emp[0] !== "undefined")
      { option_line = this.state.emp.map((element) => {return <option value={element.nom_type}> {element.nom_type} </option>})}
    return (
      <div className="container-fluid">
        <Navbar />
        <div className="container">
          <div className="breadcrumb_section_equip">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Equipement</li>
                <li className="breadcrumb-item active" aria-current="page">Ajouter_Equipement</li>
              </ol>
            </nav>
          </div>
          <form   onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
            {(this.state.insert === true) ? (<div className="alert alert-primary" role="alert">Equipement ajouter</div>) : (<div></div>) }
            </div>
            <div className="form-group">
              <label htmlFor="InputLibelle">Libelle equipement :</label>
              <input type="text" className="form-control" id="InputLibelle"  name="libelle_equip" placeholder="Enter equipement libelle" value={this.state.libelle_equip} onChange={this.onChange.bind(this)} />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputType_equip">Type Equipement :</label>
                  <select  className="form-control" id="InputType_equip"  name="type_equip"  value={this.state.type_equip} onChange={this.onChange.bind(this)}>
                      {option_line}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputMarque_equip">Marque equipement :</label>
                  <input type="text" className="form-control" id="InputMarque_equip" name="marque_equip" placeholder="Marque equipement" value={this.state.marque_equip} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputEndroit_inst">Endroit installation :</label>
                  <input type="text" className="form-control" id="InputEndroit_inst" name="endroit_installation" placeholder="Endroit d'installation" value={this.state.endroit_installation} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputDocumentation">Nom de fichier du documentation :</label>
                  <input type="text" className="form-control" id="InputDocumentation" name="documentation_equip" placeholder="Nom de fichier du documentation" value={this.state.documentation_equip} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputDate_aq">Date aquisition :</label>
                  <input type="date" className="form-control" id="InputDate_aq" name="date_aquisition" placeholder="date aquisition" value={this.state.date_aquisition} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputDuree_gar">durée garentie :</label>
                  <input type="text" className="form-control" id="InputDuree_gar" name="duree_garentie" placeholder="durée garentie" value={this.state.duree_garentie} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="InputRem_equip">Remarque equipement :</label>
              <textarea  className="form-control" id="InputRem_equip" name="remarque_equip" placeholder="remarque equipement" value={this.state.remarque_equip} onChange={this.onChange.bind(this)}/>
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

export default Addequip;
