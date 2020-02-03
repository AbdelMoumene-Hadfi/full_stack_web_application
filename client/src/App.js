import React from 'react';
import {BrowserRouter as Router ,  Route } from "react-router-dom";

import Home from './components/home' ;
import LogAdmin from './components/asadmin' ;
import LogInterv from './components/asinterv' ;
import Dashboard from './components/dashboard' ;
import Addstock from './components/addproduit' ;
import Addequip from './components/addequip' ;
import Showstock from './components/showstock' ;
import Showequip from './components/showequip' ;
import Settingadmin from './components/setting_admin' ;
import Addinstock from './components/addnbstock' ;
import Interventionprev from './components/addinterv_prev' ;
import ShowTypeEquip from './components/gestiontype_equip' ;
import DeleteEquip from './components/deleteEquip' ;
import DeleteStock from './components/deleteStock' ;
import Interventioncor from './components/addinterv_cor' ;
import Showintervention from './components/showintervention' ;
import Showallintervention from './components/showall_interv' ;
import Deletintervention from './components/deleteinterv' ;
import Addintervenant from './components/addintervenant' ;
import Showintervenant from './components/showintervenant' ;
import Deleteintervenant from './components/deleteintervenant'


function App() {
  return (
    <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/sign_admin" component={LogAdmin} />
          <Route exact path="/sign_interv" component={LogInterv} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/stock/add" component={Addstock} />
          <Route exact path="/stock/show" component={Showstock} />
          <Route exact path="/stock/augment" component={Addinstock} />
          <Route exact path="/stock/delete" component={DeleteStock} />
          <Route exact path="/equipement/add" component={Addequip} />
          <Route exact path="/equipement/show" component={Showequip} />
          <Route exact path="/equipement/delete" component={DeleteEquip} />
          <Route exact path="/setting" component={Settingadmin} />
          <Route exact path="/intervention/addinterv_prev" component={Interventionprev} />
          <Route exact path="/intervention/addinterv_cor" component={Interventioncor} />
          <Route exact path="/intervention/show" component={Showintervention} />
          <Route exact path="/intervention/showall" component={Showallintervention} />
          <Route exact path="/intervention/delete" component={Deletintervention} />
          <Route exact path="/type_equip" component={ShowTypeEquip} />
          <Route exact path="/intervenant/add" component={Addintervenant} />
          <Route exact path="/intervenant/show" component={Showintervenant} />
          <Route exact path="/intervenant/delete" component={Deleteintervenant} />







        </div>
      </Router>
  );
}

export default App;
