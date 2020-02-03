import React from "react";
import axios from 'axios' ;
import Navbar from "./navbar" ;
import "./Style/interv_style.css";
import {addInterv_cor} from "./Function/AddintervFunction";


class Interventioncor extends React.Component {
  constructor() {
    super();
    this.state = {N_maintenance : '' ,date_heure_maintenance : '' , procedure_maintenance : '' ,panne : '', remarque_maintenance : '' ,temps_arret : '' ,temps_maint : '' ,libelle_equip : '',libelle_interv : '' ,libelle_stock : '',nb_piece : 0 ,intervenant_list : [] , stock_list : [] , intervenant_bd : {}, stock : {} , equip : {}, insert : false , errors : ''};
  }
  componentWillMount() {
    if(typeof localStorage.usertoken == 'undefined')
      {this.props.history.push(`/`);return ;}
    //
    const type  = localStorage.typeconn ;
    if(type !== "interv")
      {this.props.history.push(`/`);return ;}
  }
  componentDidMount() {
    axios.post('/api/select/equipement')
         .then((res) => {this.setState({equip : res.data.msg})})
         .catch((err) => {console.log(err);})
    //
    axios.post('/api/select/stock')
         .then((res) => {this.setState({stock : res.data.msg})})
         .catch((err) => {console.log(err);})
    //
    axios.post('/api/select/intervenant')
         .then((res) => {this.setState({intervenant_bd : res.data.msg})})
         .catch((err) => {console.log(err);})

  }
  onChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    const interv = {N_maintenance : this.state.N_maintenance ,date_heure_maintenance : this.state.date_heure_maintenance , procedure_maintenance : this.state.procedure_maintenance , panne : this.state.panne , remarque_maintenance : this.state.remarque_maintenance ,temps_arret : this.state.temps_arret ,temps_maint : this.state.temps_maint ,libelle_equip : this.state.libelle_equip ,intervenant : this.state.intervenant_list , stock : this.state.stock_list };
    addInterv_cor(interv)
      .then((res) => {
        if (res) {this.setState({ errors : '' , insert : true});}
        })
      .catch((err) => {this.setState({ errors : err ,  insert : false});})
  }
  addIntervenant(e) {
    e.preventDefault();
    if(this.state.libelle_interv !=="NULL")
      {var exist = this.state.intervenant_list.find( (element) => {return (element === this.state.libelle_interv)  }) ;
      if(typeof exist === "undefined") {
      this.setState({intervenant_list : [...this.state.intervenant_list , this.state.libelle_interv]});}}
  }
  addStock(e) {
    e.preventDefault();
    if(this.state.libelle_stock !=="NULL" && this.state.nb_piece!== 0 )
      {var exist = this.state.stock_list.find( (element) => {return (element[0] === this.state.libelle_stock)  }) ;
      if(typeof exist === "undefined") {
        var piece_disponible = this.state.stock.find( (element) => {return(element.libelle_produit === this.state.libelle_stock && element.quantite_existante >= this.state.nb_piece )})
        if (typeof piece_disponible === "undefined") {
          this.setState({ errors : `nombre de piece en stock de ${this.state.libelle_stock} est`});
          }
        else {
        this.setState({stock_list : [...this.state.stock_list , [this.state.libelle_stock,this.state.nb_piece]]});}
      }
    }
  }
  render() {
    let equip_line ;
    if(typeof this.state.equip[0] !== "undefined")
      {equip_line = this.state.equip.map((equipement) => {return <option value={equipement.libelle_equip}> {equipement.libelle_equip} </option>})}
    //
    let interv_line;
    if(typeof this.state.intervenant_bd[0] !== "undefined")
      {interv_line = this.state.intervenant_bd.map((intervenant) => {return <option value={intervenant.matricule}> {intervenant.matricule +' : '+ intervenant.nom +' + '+ intervenant.prenom} </option>})}
    //
    let stock_line;
    if(typeof this.state.stock[0] !== "undefined")
      {stock_line = this.state.stock.map((element) => {return <option value={element.libelle_produit}> {element.libelle_produit +' '+ element.nu_serie +' '+ element.emplacement} </option>})}
    //
    let interv_list = this.state.intervenant_list.map((intervenant) => {return <div>{intervenant}</div>})
    let stockaff_list = this.state.stock_list.map((element) => {return <div>{element[0] + ',nombre de piece : ' + element[1]}</div>})
    return (
      <div className="container-fluid">{console.log()}
        <Navbar />
        <div className="container">
          <div className="breadcrumb_section_interv">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Intervention</li>
                <li className="breadcrumb-item active" aria-current="page">Ajouter Maintenance Preventive</li>
              </ol>
            </nav>
          </div>
          <form   onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
            {(this.state.insert === true) ? (<div className="alert alert-primary" role="alert">Equipement ajouter</div>) : (<div></div>) }
            </div>
            <div className="form-group">
              <label htmlFor="InputN_maint">Numero de Maintenance :</label>
              <input type="text" className="form-control" id="InputN_maint"  name="N_maintenance" placeholder="Entrer Numero de Maintenance " value={this.state.N_maintenance} onChange={this.onChange.bind(this)} />
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputDate_maint">Date & l'heure du maintenance :</label>
                  <input type="datetime-local" className="form-control" id="InputDate_maint" name="date_heure_maintenance" placeholder="date & heure du maintenance" value={this.state.date_heure_maintenance} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="Inputequip">Equipement :</label>
                  <select  className="form-control" id="Inputequip"  name="libelle_equip"  value={this.state.libelle_equip} onChange={this.onChange.bind(this)}>
                    {equip_line}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-10">
                <div className="form-group">
                  <label htmlFor="InputInterv">intervenant :</label>
                  <select  className="form-control" id="InputInterv"  name="libelle_interv"  value={this.state.libelle_interv} onChange={this.onChange.bind(this)}>
                    <option value="NULL"> choisir intervenant </option>
                    {interv_line}
                    </select>
                </div>
              </div>
              <div className="col-2">
                <div className="form-group">
                  <button onClick={this.addIntervenant.bind(this)}className="buttonclass btn btn-primary ">ajouter intervenant</button>
                </div>
              </div>
            </div>
            <div className="form-group">
              {(interv_list.length !== 0) ? (<div>{interv_list}</div>) : (<div></div>) }
            </div>
            <div className="form-group">
              <label htmlFor="Inputproc_maint">Procedure de maintenance :</label>
              <textarea  className="form-control" id="Inputproc_maint" name="procedure_maintenance" placeholder="Procedure de maintenance" value={this.state.procedure_maintenance} onChange={this.onChange.bind(this)}/>
            </div>
            <div className="form-group">
              <label htmlFor="Inputpanne">Panne :</label>
              <textarea  className="form-control" id="Inputpanne" name="panne" placeholder="Panne" value={this.state.panne} onChange={this.onChange.bind(this)}/>
            </div>
            <div className="form-group">
              <label htmlFor="InputRem">Remarque  :</label>
              <textarea  className="form-control" id="InputRem" name="remarque_maintenance" placeholder="remarque " value={this.state.remarque_maintenance} onChange={this.onChange.bind(this)}/>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="Inputtemps_arret">temps d'arret :</label>
                  <input type="datetime-local" className="form-control" id="Inputtemps_arret" name="temps_arret" placeholder="temps d'arret" value={this.state.temps_arret} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="InputDuree">durée du  maintenance :</label>
                  <input type="text" className="form-control" id="InputDuree" name="temps_maint" placeholder="durée du  maintenance" value={this.state.temps_maint} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <div className="form-group">
                  <label htmlFor="Inputstock">Piece de Rechange :</label>
                  <select  className="form-control" id="Inputstock"  name="libelle_stock"  value={this.state.libelle_stock} onChange={this.onChange.bind(this)}>
                    <option value="NULL"> choisir piece </option>
                    {stock_line}
                    </select>
                </div>
              </div>
              <div className="col-5">
                <div className="form-group">
                  <label htmlFor="Inputnbpiece">nombre de Piece :  </label>
                  <input type="number" min="0" className="form-control" id="Inputnbpiece" name="nb_piece" placeholder="nombre piece" value={this.state.nb_piece} onChange={this.onChange.bind(this)}/>
                </div>
              </div>
              <div className="col-2">
                <div className="form-group">
                  <button onClick={this.addStock.bind(this)} className="buttonclass btn btn-primary ">ajouter piece</button>
                </div>
              </div>
            </div>
            <div className="form-group">
              {(stockaff_list.length !== 0) ? (<div>{stockaff_list}</div>) : (<div></div>) }
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

export default Interventioncor;
