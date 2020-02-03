import React from "react";
import {Link} from "react-router-dom";
import "./Style/stock_style.css";

class Stock extends React.Component {
  constructor() {
    super();
    this.state = {type : ''};
  }
  componentWillMount() {
    if(typeof localStorage.usertoken == 'undefined')
      {this.props.history.push(`/`);return ;}
    //
    this.setState({type : localStorage.typeconn})

  }
  render() {
    return (
      <div>
        {(this.state.type === "interv") ? (
          <div className="container_content_int">
          <div className="content_element_stock">
            <Link to="/stock/add"><button className="btn btn-primary">ajouter element au stock</button></Link>
          </div>
          <div className="content_element_stock">
            <Link to="/stock/show"><button className="btn btn-primary">afficher stock</button></Link>
          </div>
          <div className="content_element_stock">
            <Link to="/stock/augment"><button className="btn btn-primary">augmenter stock</button></Link>
          </div>
        </div>
        ) :
        (<div className="container_content_int">
          <div className="content_element_stock">
            <Link to="/stock/delete"><button className="btn btn-primary">supprimer element du stock</button></Link>
          </div>
         </div>
        )}
    </div>

);}
}

export default Stock ;
