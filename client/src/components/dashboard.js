import React from "react";
import {Link ,} from "react-router-dom";
import axios from 'axios' ;
import "./Style/dashboard_style.css";

import Navbar from "./navbar";
import Chart from "./chart";
import Intervenant from './intervenant';
import Intervention from './intervention';
import Equipement from './equipement';
import Stock from './stock';


class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = { onInterv : false , onEquip : false , onStock : false , onIntervenant : false, type : '', stockfirst : {}};
  }
  componentWillMount() {
    if(typeof localStorage.usertoken == 'undefined')
      {this.props.history.push(`/`);return ;}
    //
    this.setState({type : localStorage.typeconn})
    //
    axios.post('/api/select/stockfirst')
         .then((res) => {this.setState({stockfirst : res.data.msg})})
         .catch((err) => {console.log(err);})

  }
  toggle_interv = () => {this.setState({onInterv :!this.state.onInterv , onEquip : false , onStock : false , onIntervenant : false});}
  toggle_equip = () => {this.setState({onInterv :false , onEquip : !this.state.onEquip , onStock : false , onIntervenant : false});}
  toggle_stock = () => {this.setState({onInterv :false , onEquip : false , onStock : !this.state.onStock , onIntervenant : false});}
  toggle_intervenant = () => {this.setState({onInterv :false , onEquip : false , onStock : false , onIntervenant : !this.state.onIntervenant});}
  render() {
    let stock_avert ;
    if(typeof this.state.stockfirst[0] !== "undefined")
      {stock_avert = this.state.stockfirst.map((element) => {return <div className="alert alert-danger" role="alert">
          veuillez ajouter un element au stock du produit , libelle :  {element.libelle_produit} ; nm_serie : {element.nu_serie} ; marque : {element.marque_produit}
          </div>})}

    return (
        <div className="container-fluid">

          <Navbar />
          <div className="container_title">
            <h1>Dashboard :</h1>
          </div>
          <div className="container_chart">
            <Chart />
          </div>
          <div className="container_content">
            {stock_avert}
          </div>

          <div className="container_content">

            {(this.state.type === "admin") ? (
              <div className="content_element">
                <button className="btn btn-primary" onClick={this.toggle_intervenant}>intervenant</button>
              </div>
            ) :
            (<div></div>)}
            {(this.state.type === "admin") ? (
              <div className="content_element">
                  <Link to="/type_equip"><button className="btn btn-primary">type equipement</button></Link>
              </div>
            ) :
            (<div></div>)}

            <div className="content_element">
              <button className="btn btn-primary" onClick={this.toggle_interv}>intervention</button>
            </div>
            <div className="content_element">
              <button className="btn btn-primary" onClick={this.toggle_equip}>equipement</button>
            </div>
            <div className="content_element">
              <button className="btn btn-primary" onClick={this.toggle_stock}>stock</button>
            </div>


          </div>
        <div>{this.state.onIntervenant && <Intervenant />}</div>
        <div>{this.state.onInterv && <Intervention />}</div>
        <div>{this.state.onEquip && <Equipement />}</div>
        <div>{this.state.onStock && <Stock />}</div>

        </div>



  );


 }
}

export default Dashboard ;
