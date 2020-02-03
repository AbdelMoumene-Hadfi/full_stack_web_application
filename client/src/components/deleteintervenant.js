import React from "react";
import axios from 'axios' ;
import Navbar from "./navbar" ;
import "./Style/showequip_style.css";


class Deleteintervenant extends React.Component {
  constructor() {
    super();
    this.state = {matricule : '' , millieu_travaille : '',fonction : '', intervenant : {}};
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
    axios.post('/api/select/intervenant')
         .then((res) => {this.setState({intervenant : res.data.msg})})
         .catch((err) => {console.log(err);}) }
  onChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }
  delete = (e) => {e.preventDefault();
                   axios.post('/api/delete/intervenant',{matricule : e.target.name})
                        .then((res) => {axios.post('/api/select/intervenant').then((res) => {this.setState({intervenant : res.data.msg})})
                                             .catch((err) => {console.log(err);}) })
                        .catch((err) => {this.setState({ errors2 : err.response});})}
  render() {
    let intervenant_line ;
    if(typeof this.state.intervenant[0] !== "undefined")
      {intervenant_line = this.state.intervenant.map((element) => {if(element.matricule.startsWith(this.state.matricule) && element.millieu_travaille.startsWith(this.state.millieu_travaille) && element.fonction.startsWith(this.state.fonction) ){return <tr><th scope="row">{element.matricule}</th><td>{element.nom}</td><td>{element.prenom}</td><td>{element.millieu_travaille}</td><td>{element.fonction}</td><button className="btn btn-danger delete_button" onClick={this.delete.bind(this)} name={element.matricule}>delete</button></tr>}return<tr></tr>;})}
    return (
      <div className="container-fluid">
        <Navbar />

        <div className="container">
          <div className="breadcrumb_section_equip">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Intervenant</li>
                <li className="breadcrumb-item active" aria-current="page">Afficher Intervenant</li>
              </ol>
            </nav>
          </div>
          <form>
           <div className="row">
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="InputLibelle">Matricule :</label>
                <input type="text" className="form-control" id="InputLibelle"  name="matricule" placeholder="Entrer matricule " value={this.state.matricule} onChange={this.onChange.bind(this)} />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="InputType">millieu travaille :</label>
                <input type="text" className="form-control" id="InputType"  name="millieu_travaille" placeholder="Entrer millieu travaille" value={this.state.millieu_travaille} onChange={this.onChange.bind(this)} />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="InputMarque">fonction :</label>
                <input type="text" className="form-control" id="InputMarque"  name="fonction" placeholder="Entrer fonction" value={this.state.fonction} onChange={this.onChange.bind(this)} />
              </div>
            </div>
           </div>
          </form>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Matricule</th>
                <th scope="col">Nom</th>
                <th scope="col">Prenom</th>
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
    );
  }
}

export default Deleteintervenant;
