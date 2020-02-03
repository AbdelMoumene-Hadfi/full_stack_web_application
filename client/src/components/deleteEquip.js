import React from "react";
import axios from 'axios' ;
import Navbar from "./navbar" ;
import "./Style/showequip_style.css";


class DeleteEquip extends React.Component {
  constructor() {
    super();
    this.state = {libelle_equip : '' ,type_equip : '',marque_equip : '', equip : {},errors2 : ''};
  }
  componentWillMount() {
    if(typeof localStorage.usertoken == 'undefined')
      {this.props.history.push(`/`);return ;}
  }
  componentDidMount() {
    axios.post('/api/select/equipement')
         .then((res) => {this.setState({equip : res.data.msg})})
         .catch((err) => {console.log(err);}) }
  onChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }
  delete = (e) => {e.preventDefault();
                   axios.post('/api/delete/equipement',{libelle_equip : e.target.name})
                        .then((res) => {axios.post('/api/select/equipement').then((res) => {this.setState({equip : res.data.msg})})
                                             .catch((err) => {console.log(err);}) })
                        .catch((err) => {this.setState({ errors2 : err.response.data.msg.substring(0,103)});})}
  render() {
    let equip_line ;
    if(typeof this.state.equip[0] !== "undefined")
      {console.log(this.state.equip);equip_line = this.state.equip.map((element) => {if(element.libelle_equip.startsWith(this.state.libelle_equip) && element.type_equip.startsWith(this.state.type_equip) && element.marque_equip.startsWith(this.state.marque_equip) ){return <tr><th scope="row">{element.libelle_equip}</th><td>{element.type_equip}</td><td>{element.marque_equip}</td><button className="btn btn-danger delete_button" onClick={this.delete.bind(this)} name={element.libelle_equip}>delete</button></tr>}return<tr></tr>;})}
    return (
      <div className="container-fluid">
        <Navbar />

        <div className="container">
          <div className="breadcrumb_section_equip">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Equipement</li>
                <li className="breadcrumb-item active" aria-current="page">Supprimer Equipement</li>
              </ol>
            </nav>
          </div>
          <form>
           <div className="row">
            <div className="form-group">
               {(this.state.errors2 !== '') ? (<div className="text-danger center_alert">{this.state.errors2.toString()}</div>) : (<div></div>) }
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="InputLibelle">Libelle equipement :</label>
                <input type="text" className="form-control" id="InputLibelle"  name="libelle_equip" placeholder="Entrer libelle d'equipement " value={this.state.libelle_equip} onChange={this.onChange.bind(this)} />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="InputType">Type equipement :</label>
                <input type="text" className="form-control" id="InputType"  name="type_equip" placeholder="Entrer type d'equipement" value={this.state.type_equip} onChange={this.onChange.bind(this)} />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="InputMarque">Marque equipement :</label>
                <input type="text" className="form-control" id="InputMarque"  name="marque_equip" placeholder="Entrer marque d'equipement" value={this.state.marque_equip} onChange={this.onChange.bind(this)} />
              </div>
            </div>
           </div>
          </form>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">libelle equipement</th>
                <th scope="col">type equipement</th>
                <th scope="col">marque equipement</th>
              </tr>
            </thead>
            <tbody>
              {equip_line}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DeleteEquip;
