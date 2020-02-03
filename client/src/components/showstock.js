import React from "react";
import axios from 'axios' ;
import Navbar from "./navbar"
import "./Style/showstock_style.css";


class Showstock extends React.Component {
  constructor() {
    super();
    this.state = {libelle_element : '' ,nmserie_element : '',marque_element : '', stock : {}};
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
    axios.post('/api/select/stock')
         .then((res) => {this.setState({stock : res.data.msg})})
         .catch((err) => {console.log(err);}) }
  onChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }
  render() {
    let stock_line ;
    if(typeof this.state.stock[0] !== "undefined")
      {stock_line = this.state.stock.map((element) => {if(element.libelle_produit.startsWith(this.state.libelle_element) && element.nu_serie.startsWith(this.state.nmserie_element) && element.marque_produit.startsWith(this.state.marque_element) ){return <tr><th scope="row">{element.libelle_produit}</th><td>{element.nu_serie}</td><td>{element.marque_produit}</td><td>{element.quantite_existante}</td><td>{element.quantite_alert}</td><td>{element.emplacement}</td></tr>}return<tr></tr>;})}
    return (
      <div className="container-fluid">
        <Navbar />

        <div className="container">
          <div className="breadcrumb_section_stock">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Stock</li>
                <li className="breadcrumb-item active" aria-current="page">Afficher Stock</li>
              </ol>
            </nav>
          </div>
          <form>
           <div className="row">
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="InputLibelle">Libelle element en stock :</label>
                <input type="text" className="form-control" id="InputLibelle"  name="libelle_element" placeholder="Entrer libelle d'element " value={this.state.libelle_element} onChange={this.onChange.bind(this)} />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="InputNmserie">Nm serie element en stock :</label>
                <input type="text" className="form-control" id="InputNmserie"  name="nmserie_element" placeholder="Entrer Nm serie d'element" value={this.state.nmserie_element} onChange={this.onChange.bind(this)} />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="InputMarque">Marque element en stock :</label>
                <input type="text" className="form-control" id="InputMarque"  name="marque_element" placeholder="Entrer marque d'element" value={this.state.marque_element} onChange={this.onChange.bind(this)} />
              </div>
            </div>
           </div>
          </form>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">libelle element</th>
                <th scope="col">nu serie</th>
                <th scope="col">marque element</th>
                <th scope="col">quantite existante</th>
                <th scope="col">quantite alert</th>
                <th scope="col">emplacement</th>
              </tr>
            </thead>
            <tbody>
              {stock_line}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Showstock;
