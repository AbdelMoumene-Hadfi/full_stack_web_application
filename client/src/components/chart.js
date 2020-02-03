import React, {Component} from 'react';
import axios from 'axios' ;
import {Pie} from 'react-chartjs-2';

class Chart extends Component{
  constructor(){
    super();
    this.state = {nbstock : {} }
  }
  componentDidMount() {
    axios.post('/api/select/chartnbstock')
         .then((res) => {this.setState({nbstock : res.data.msg})})
         .catch((err) => {console.log(err);}) }
  render(){
    let colors = ["Dark","Red","Orange","Yellow","Green","Cyan","Blue","Purple","Pink","White","Gray","Brown","Lightyellow","Silver","Azure","SKYBLUE","LIME","Dark","Red","Orange","Yellow","Green","Cyan","Blue","Purple","Pink","White","Gray","Brown","Lightyellow","Silver","Azure","SKYBLUE","LIME"];
    let data = {datasets: [{data: [],backgroundColor:[]}],labels: []}
    for (let i=0;i<this.state.nbstock.length;i++)
      {data.labels.push(this.state.nbstock[i].libelle_produit);
       data.datasets[0].data.push(this.state.nbstock[i].quantite_existante);
       data.datasets[0].backgroundColor.push(colors[i]);}
    console.log(data);
    return (
      <div className="chart">
        <Pie
          data={data}
          options={{
            title:{
              display:true,
              text:'Stock',
              fontSize:15 ,
              position:'bottom'
            },
            legend:{
              display:true,
              position:'right'
            },

          }}
        />
      </div>
    )
  }
}

export default Chart;
