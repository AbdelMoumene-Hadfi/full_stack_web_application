import React from "react";
import {Link} from "react-router-dom";
import "./Style/home_style.css";
import {loginasinterv} from "./Function/LoginFunctions";


class LogInterv extends React.Component {
  constructor() {
    super();
    this.state = {matricule : '' , password_interv : '' , errors : ''};
  }
  onChange(e) {this.setState({[e.target.name] : e.target.value});}
  onSubmit(e) {
    e.preventDefault();
    const user = {matricule : this.state.matricule , password_interv : this.state.password_interv};
    loginasinterv(user)
      .then((res) => {
        if (res) {this.props.history.push(`/dashboard`)}
        })
      .catch((err) => {this.setState({ errors : err});})
  }
  render(){
    if(this.state.errors !== '' )
      {document.getElementById('error_msg').innerHTML =  this.state.errors ;
      }
    return (
      <div className="container-fluid">
        <form className="section" onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="inputUser">Matricule :</label>
            <input type="text" className="form-control" id="inputUser" name="matricule" placeholder="Enter your matricule" value={this.state.matricule} onChange={this.onChange.bind(this)}/>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password :</label>
            <input type="password" className="form-control" id="inputPassword" name="password_interv" placeholder="Password" value={this.state.password_interv} onChange={this.onChange.bind(this)}  />
          </div>
          <div className="form-group">
            <div id="error_msg" className="text-danger"></div>
          </div>
          <div className="row">
            <div className="col-6">
              <Link to="/"><button className="btn btn-danger">return</button></Link>
            </div>
            <div className="col-6">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>

  );
 }
}
export default LogInterv;
