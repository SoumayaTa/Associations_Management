import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Index from './component/Index';
import AddCenter from './component/AddCenter';
import AddAssociation from './component/AddAssociation';
import ListAssociations from './component/ListAssociations';
import UpdateAssociation from './component/UpdateAssociation';
import AddFacture from './component/AddFacture';
import Factures from './component/Factures';
import UpdateFacture from './component/UpdateFactures';
import RCAPM from './component/RCAPM';
import RCAPA from './component/RCAPA';
import Releve from './component/Releve';
import ListeCentre from './component/ListeCentre';
import UpdateCentre from './component/UpdateCentre';
import Home from './component/Home';

function App() {
 const isLoggedIn =  localStorage.getItem("isLoggedIn");
 console.log(isLoggedIn)
  return (
    <div>
       <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/create/association" element={<AddAssociation/>}/>
        <Route path="/create/center" element={<AddCenter/>}/>
        <Route path="/list/associations" element={<ListAssociations/>}/>
        <Route path="/update/association/:associationId" element={<UpdateAssociation/>}/>
        <Route path="/create/facture/" element={<AddFacture/>}/>
        <Route path="/facture/all" element={<Factures/>}/>
        <Route path="/update/facture/:factureId" element={<UpdateFacture/>}/>
        <Route path="/generate/rcapm" element={<RCAPM/>}/>
        <Route path="/generate/rcapa" element={<RCAPA/>}/>
        <Route path="/generate/releve" element={<Releve/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/list/centres" element={<ListeCentre/>}/>
        <Route path="/update/centre/:centreId" element={<UpdateCentre/>}/>

      </Routes>

    </div>
  );
}

export default App;
