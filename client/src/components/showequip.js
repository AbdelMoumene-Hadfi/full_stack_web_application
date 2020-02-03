import React from "react";
import axios from 'axios' ;
import Navbar from "./navbar" ;
import "./Style/showequip_style.css";


class Showequip extends React.Component {
  constructor() {
    super();
    this.state = {libelle_equip : '' ,type_equip : '',marque_equip : '', equip : {}};
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
         .catch((err) => {console.log(err);}) }
  onChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }
  render() {
    let equip_line ;
    if(typeof this.state.equip[0] !== "undefined")
      {console.log(this.state.equip);equip_line = this.state.equip.map((element) => {if(element.libelle_equip.startsWith(this.state.libelle_equip) && element.type_equip.startsWith(this.state.type_equip) && element.marque_equip.startsWith(this.state.marque_equip) ){return <tr><th scope="row">{element.libelle_equip}</th><td>{element.type_equip}</td><td>{element.marque_equip}</td><td>{element.endroit_installation}</td><td>{element.documentation_equip}</td><td>{element.date_aquisition.substring(0,10)}</td><td>{element.duree_garentie}</td><td>{element.remarque_equip}</td></tr>}return<tr></tr>;})}
    return (
      <div className="container-fluid">
        <Navbar />

        <div className="container">
          <div className="breadcrumb_section_equip">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Equipement</li>
                <li className="breadcrumb-item active" aria-current="page">Afficher Equipement</li>
              </ol>
            </nav>
          </div>
          <form>
           <div className="row">
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
                <th scope="col">endroit installation</th>
                <th scope="col">documentation</th>
                <th scope="col">date aquisition</th>
                <th scope="col">duree garentie</th>
                <th scope="col">remarque</th>
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

export default Showequip;
