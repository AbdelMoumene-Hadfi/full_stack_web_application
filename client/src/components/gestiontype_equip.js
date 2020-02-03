import React from "react";
import axios from 'axios' ;
import Navbar from "./navbar" ;
import "./Style/gestiontypeequipe_style.css";
import {addTypeEquipe} from "./Function/addTypeEquipeFunction";


class ShowTypeEquip extends React.Component {
  constructor() {
    super();
    this.state = {nom_type : '' , errors : '', errors2 : '',insert : false, type_equip : {}};
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
    axios.post('/api/select/type_equip')
         .then((res) => {this.setState({type_equip : res.data})})
         .catch((err) => {console.log(err);}) }
  onChange(e) {
    this.setState({[e.target.name] : e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    const typeEquip = {nom_type : this.state.nom_type};
    addTypeEquipe(typeEquip)
      .then((res) => {
        if (res) {
          this.setState({ errors : '' , insert : true});
          axios.post('/api/select/type_equip').then((res) => {this.setState({type_equip : res.data})})
               .catch((err) => {console.log(err);}) }
        })
      .catch((err) => {this.setState({ errors : err});})
   }
   delete = (e) => {e.preventDefault();
                    axios.post('/api/delete/type_equip',{nom_type : e.target.name})
                         .then((res) => {axios.post('/api/select/type_equip').then((res) => {this.setState({type_equip : res.data})})
                                              .catch((err) => {console.log(err);}) })
                         .catch((err) => {this.setState({ errors2 : err.response.data.msg.substring(0,103)});})}
  render() {
    let typeequip_line ;
    if(typeof this.state.type_equip[0] !== "undefined")
      {typeequip_line = this.state.type_equip.map((element) => {return <tr><th scope="row">{element.nom_type}
      <button className="btn btn-danger delete_button" onClick={this.delete.bind(this)} name={element.nom_type}>delete</button></th></tr>})}
    return (
      <div className="container-fluid">
        <Navbar />

        <div className="container">
          <div className="breadcrumb_section_equip">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item active" aria-current="page">Type Equipement</li>
              </ol>
            </nav>
          </div>
          <div className="row">
           <div className="col-6">
             <form   onSubmit={this.onSubmit.bind(this)}>
               <div className="form-group">
                 {(this.state.insert === true) ? (<div className="alert alert-primary" role="alert">Equipement ajouter</div>) : (<div></div>) }
               </div>
               <div className="form-group">
                 <label htmlFor="InputType">Type equipement :</label>
                 <input type="text" className="form-control" id="InputType"  name="nom_type" placeholder="Enter name of equipement type" value={this.state.nom_type} onChange={this.onChange.bind(this)} />
               </div>
               <div className="form-group">
                 {(this.state.errors !== '') ? (<div className="text-danger center_alert">{this.state.errors.toString()}</div>) : (<div></div>) }
               </div>
               <div className="center_alert">
                 <button type="submit" className="btn btn-primary ">Submit</button>
               </div>
             </form>
            </div>
            <div className="col-6">
              <div className="form-group">
                  {(this.state.errors2 !== '') ? (<div className="text-danger center_alert">{this.state.errors2.toString()}</div>) : (<div></div>) }
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">type equipement</th>
                  </tr>
                </thead>
                <tbody>
                  {typeequip_line}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowTypeEquip;
