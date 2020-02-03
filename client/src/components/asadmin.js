import React from "react";
import {Link} from "react-router-dom";
import "./Style/home_style.css";
import {loginasadmin} from "./Function/LoginFunctions";


class LogAdmin extends React.Component {
  constructor() {
    super();
    this.state = {user : '' , password_Admin : '' , errors : ''};
  }
  onChange(e) {this.setState({[e.target.name] : e.target.value});}
  onSubmit(e) {
    e.preventDefault();
    const user = {user : this.state.user , password_Admin : this.state.password_Admin};
    loginasadmin(user)
      .then((res) => {
        if (res) {this.props.history.push(`/dashboard`)}
        })
      .catch((err) => {this.setState({ errors : err});})
  }
  render() {
    if(this.state.errors !== '' )
      {document.getElementById('error_msg').innerHTML =  this.state.errors ;
      }

    return (
      <div className="container-fluid">
        <form className="section"  onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <label htmlFor="InputUser">User :</label>
            <input type="text" className="form-control" id="InputUser"  name="user" placeholder="Enter your user" value={this.state.user} onChange={this.onChange.bind(this)} />
            </div>
          <div className="form-group">
            <label htmlFor="InputPassword">Password :</label>
            <input type="password" className="form-control" id="InputPassword" name="password_Admin" placeholder="Password" value={this.state.password_Admin} onChange={this.onChange.bind(this)}/>
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

export default LogAdmin;
