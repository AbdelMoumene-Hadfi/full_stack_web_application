import React from "react";
import axios from 'axios' ;
import Navbar from "./navbar"
import "./Style/showintervention_style.css";


class Deletintervention extends React.Component {
  constructor() {
    super();
    this.state = {N_maintenance : '',libelle_equip : '' , intervention_cor : {} , intervention_prev : {} , stock : {} , intervenant : {}};
  }
  componentWillMount() {
    if(typeof localStorage.usertoken == 'undefined')
      {this.props.history.push(`/`);return ;}
    //
    const type  = localStorage.typeconn ;
    if(type !== "admin")
      {this.props.history.push(`/`);return ;}
  }
  componentDidMount() {
    axios.post('/api/select/intervention_cor')
         .then((res) => {this.setState({intervention_cor: res.data.msg})})
         .catch((err) => {console.log(err);})
    axios.post('/api/select/intervention_prev')
         .then((res) => {this.setState({intervention_prev: res.data.msg})})
         .catch((err) => {console.log(err);});}
  onChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }
  delete = (e) => {e.preventDefault();
                   axios.post('/api/delete/intervention',{N_maintenance : e.target.name})
                        .then((res) => {axios.post('/api/select/intervention_cor')
                                             .then((res) => {this.setState({intervention_cor: res.data.msg})})
                                             .catch((err) => {console.log(err);});
                                        axios.post('/api/select/intervention_prev')
                                             .then((res) => {this.setState({intervention_prev: res.data.msg})})
                                             .catch((err) => {console.log(err);}) })
                        .catch((err) => {this.setState({ errors2 : err.response});})}
  render() {
    let intervention_prev_line ;
    if(typeof this.state.intervention_prev[0] !== "undefined")
      {intervention_prev_line = this.state.intervention_prev.map((element) => {if( element.N_maintenance.startsWith(this.state.N_maintenance) && element.libelle_equip.startsWith(this.state.libelle_equip)){var date=new Date(element.date_heure_maintenance);var date2=new Date(element.temps_arret);return <tr><th scope="row">{element.N_maintenance}</th><td>{date.toDateString()+" "+date.toLocaleTimeString()}</td><td>{element.procedure_maintenance}</td><td>{element.remarque_maintenance}</td><td>{date2.toDateString()+" "+date2.toLocaleTimeString()}</td><td>{element.temps_maint}</td><td>{element.libelle_equip}</td><button className="btn btn-danger delete_button" onClick={this.delete.bind(this)} name={element.N_maintenance}>delete</button></tr>}return<tr></tr>;})}
    //
    let intervention_cor_line ;
    if(typeof this.state.intervention_prev[0] !== "undefined")
      {intervention_cor_line = this.state.intervention_cor.map((element) => {if( element.N_maintenance.startsWith(this.state.N_maintenance) && element.libelle_equip.startsWith(this.state.libelle_equip)){var date=new Date(element.date_heure_maintenance);var date2=new Date(element.temps_arret);return <tr><th scope="row">{element.N_maintenance}</th><td>{date.toDateString()+" "+date.toLocaleTimeString()}</td><td>{element.procedure_maintenance}</td><td>{element.panne}</td><td>{element.remarque_maintenance}</td><td>{date2.toDateString()+" "+date2.toLocaleTimeString()}</td><td>{element.temps_maint}</td><td>{element.libelle_equip}</td><button className="btn btn-danger delete_button" onClick={this.delete.bind(this)} name={element.N_maintenance}>delete</button></tr>}return<tr></tr>;})}
    return (
      <div className="container-fluid">
        <Navbar />

        <div className="container">
          <div className="breadcrumb_section_interv">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Intervention</li>
                <li className="breadcrumb-item active" aria-current="page">Supprimer Interventions</li>
              </ol>
            </nav>
          </div>
          <form>
           <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="InputN">Numero de maintenance</label>
                <input type="text" className="form-control" id="InputN"  name="N_maintenance" placeholder="Entrer numero de maintenance" value={this.state.N_maintenance} onChange={this.onChange.bind(this)} />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="InputLibelle">Libelle equipement :</label>
                <input type="text" className="form-control" id="InputLibelle"  name="libelle_equip" placeholder="Entrer libelle d'equipement " value={this.state.libelle_equip} onChange={this.onChange.bind(this)} />
              </div>
            </div>
           </div>
          </form>
          <div>
            <div className="alert alert-primary" role="alert">Intervention Preventive :</div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">N_maintenance</th>
                <th scope="col">date & heure maintenance</th>
                <th scope="col">procedure maintenance</th>
                <th scope="col">remarque maintenance</th>
                <th scope="col">temps arret</th>
                <th scope="col">temps maintenance</th>
                <th scope="col">libelle equipement</th>
              </tr>
            </thead>
            <tbody>
              {intervention_prev_line}
            </tbody>
          </table>
          <div>
            <div className="alert alert-primary" role="alert">Intervention Corrective :</div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">N_maintenance</th>
                <th scope="col">date & heure maintenance</th>
                <th scope="col">procedure maintenance</th>
                <th scope="col">panne</th>
                <th scope="col">remarque maintenance</th>
                <th scope="col">temps arret</th>
                <th scope="col">temps maintenance</th>
                <th scope="col">libelle equipement</th>
              </tr>
            </thead>
            <tbody>
              {intervention_cor_line}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Deletintervention;
