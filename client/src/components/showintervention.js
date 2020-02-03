import React from "react" ;
import axios from 'axios' ;
import Navbar from "./navbar" ;
import "./Style/showintervention_style.css" ;


class Showintervention extends React.Component {
  constructor() {
    super();
    this.state = {N_maintenance : 'null', type_interv : 'null' , show : false , intervention : {} , intervention_info : {} , stock : {} , intervenant : {}};
  }
  componentWillMount() {
    if(typeof localStorage.usertoken == 'undefined')
      {this.props.history.push(`/`);return ;}
    //
    const type  = localStorage.typeconn ;
    if(type !== "interv")
      {this.props.history.push(`/`);return ;}
  }
  onChange(e) {
    this.setState({[e.target.name] : e.target.value});
    this.setState({show : false , intervention_info : {}});
    if(e.target.name === "type_interv" && e.target.value !== "null")
      {axios.post(`/api/select/${e.target.value}`)
           .then((res) => {this.setState({intervention: res.data.msg})})
           .catch((err) => {console.log(err);})}
    if(e.target.name === "type_interv" && e.target.value === "null")
      {this.setState({intervention: ''});}
  }
  show = (e) => {e.preventDefault();
                 if(this.state.type_interv !== "null" && this.state.N_maintenance !== "null") {
                    axios.post(`/api/select/${this.state.type_interv}`,{N_maintenance : this.state.N_maintenance})
                         .then((res) => {this.setState({intervention_info : res.data.msg})})
                         .catch((err) => {console.log(err);})

                    axios.post(`/api/select/intervention_stock`,{N_maintenance : this.state.N_maintenance})
                         .then((res) => {console.log(this.state.stock);this.setState({stock : res.data.msg})})
                         .catch((err) => {console.log(err);})

                    axios.post(`/api/select/intervention_intervenant`,{N_maintenance : this.state.N_maintenance})
                         .then((res) => {this.setState({intervenant : res.data.msg})})
                         .catch((err) => {console.log(err);})

                    this.setState({show : true});}
  }
  render() {
    let option_line ;
    if(typeof this.state.intervention[0] !== "undefined")
      {option_line = this.state.intervention.map((element) => {return <option value={element.N_maintenance}> {element.N_maintenance} </option>})}
    //
    let intervenant_line ;
    if(typeof this.state.intervenant[0] !== "undefined")
      {intervenant_line = this.state.intervenant.map((element) => {return <tr><th scope="row">{element.matricule}</th><td>{element.nom} {element.prenom}</td><td>{element.millieu_travaille}</td><td>{element.fonction}</td></tr>})}
    //
    let stock_line ;
    if(typeof this.state.stock[0] !== "undefined")
      {stock_line = this.state.stock.map((element) => {return <tr><th scope="row">{element.libelle_produit}</th><td>{element.nu_serie}</td><td>{element.marque_produit}</td><td>{element.emplacement}</td><td>{element.quantite_utilise}</td></tr>})}
    return (

      <div className="container-fluid">

            {(this.state.show) ? (
              <div className="container">
                <br/>
                <div className="alert alert-primary" role="alert">
                  Intervention {(this.state.type_interv === "intervention_prev") ? ("Preventive") : ("Corrective")} :
                </div>
                <br/>
                <div className="row">
                  <div className="col-6">
                    <div className="text text-primary">Numero de maintenance :</div>
                  </div>

                  <div className="col-6">
                    {(typeof this.state.intervention_info[0] !== "undefined") ? (this.state.intervention_info[0].N_maintenance) : ('')}
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col-6">
                    <div className="text text-primary">Equipement :</div>
                  </div>
                  <div className="col-6">
                    {(typeof this.state.intervention_info[0] !== "undefined") ? (this.state.intervention_info[0].libelle_equip) : ('')}
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col-6">
                    <div className="text text-primary">Date & heure d'intervention :</div>
                  </div>
                  <div className="col-6">
                    {(typeof this.state.intervention_info[0] !== "undefined") ? (new Date(this.state.intervention_info[0].date_heure_maintenance).toDateString()+" "+new Date(this.state.intervention_info[0].date_heure_maintenance).toLocaleTimeString()) : ('')}
                  </div>
                </div>
                <br/>
                {(this.state.type_interv === "intervention_cor") ? (
                  <div>
                    <div>
                      <div className="text text-primary">Panne :</div>
                    </div>
                    <div >
                      {(typeof this.state.intervention_info[0] !== "undefined") ? (this.state.intervention_info[0].panne) : ('')}
                    </div>
                  </div>

                  ) : (<div></div>)}
                <div>
                  <div>
                    <div className="text text-primary">Procedure d'intervention :</div>
                  </div>
                  <div >
                    {(typeof this.state.intervention_info[0] !== "undefined") ? (this.state.intervention_info[0].procedure_maintenance) : ('')}
                  </div>
                </div>
                <br/>
                <div>
                  <div>
                    <div className="text text-primary">Remarque :</div>
                  </div>
                  <div >
                    {(typeof this.state.intervention_info[0] !== "undefined") ? (this.state.intervention_info[0].remarque_maintenance) : ('')}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="text text-primary">temps d'arret :</div>
                  </div>
                  <div className="col-6">
                    <div className="text text-primary">Durée de maintenance :</div>
                  </div>
                </div>
                <br/>
                <div className="row">
                  <div className="col-6">
                    {(typeof this.state.intervention_info[0] !== "undefined") ? (new Date(this.state.intervention_info[0].temps_arret).toDateString()+" "+new Date(this.state.intervention_info[0].temps_arret).toLocaleTimeString()) : ('')}
                  </div>
                  <div className="col-6">
                    {(typeof this.state.intervention_info[0] !== "undefined") ? (this.state.intervention_info[0].temps_maint) : ('')}
                  </div>
                </div>
                <br/>
                <div>
                  <div>
                    <div className="text text-primary">Intervenant :</div>
                  </div>
                  <br/>
                  <div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Matricule</th>
                          <th scope="col">Nom & Prénom</th>
                          <th scope="col">Millieu travaille</th>
                          <th scope="col">Fonction</th>
                        </tr>
                      </thead>
                      <tbody>
                        {intervenant_line}
                      </tbody>
                    </table>
                  </div>
                </div>
                <br/>
                <div>
                  <div>
                    <div className="text text-primary">Piece d'echange :</div>
                  </div>
                  <br/>
                  <div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Libelle produit</th>
                          <th scope="col">Numero serie</th>
                          <th scope="col">Marque</th>
                          <th scope="col">Eplacement</th>
                          <th scope="col">Quantite utulise</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stock_line}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (

              <div className="container-fluid">
              <Navbar />

              <div className="container">
              <div className="breadcrumb_section_interv">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">Dashboard</li>
                    <li className="breadcrumb-item">Intervention</li>
                    <li className="breadcrumb-item active" aria-current="page">Afficher Intervention</li>
                  </ol>
                </nav>
              </div>
              <form>
                <div className="row">
                  <div className="col-5">
                    <div className="form-group">
                      <label htmlFor="Inputtype">type d'intervention :</label>
                      <select  className="form-control" id="Inputtype"  name="type_interv"  value={this.state.type_interv} onChange={this.onChange.bind(this)}>
                        <option value="null"> choisir type d'intervention :</option>
                        <option value="intervention_prev"> Preventive </option>
                        <option value="intervention_cor"> Corrective </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="form-group">
                      <label htmlFor="InputN">type d'intervention :</label>
                      <select  className="form-control" id="InputN"  name="N_maintenance"  value={this.state.N_maintenance} onChange={this.onChange.bind(this)}>
                        <option value="null"> choisir numero du maintenance : </option>
                        {option_line}
                      </select>
                    </div>
                  </div>
                  <div className="col-2">
                    <button onClick={this.show.bind(this)} className="buttonstyle btn btn-primary">afficher</button>
                  </div>
                </div>
              </form>
              </div>
              </div>
            ) }

        </div>

    );
  }
}

export default Showintervention;
