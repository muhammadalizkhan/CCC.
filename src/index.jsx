import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../index.css'
import '../tailwind.css'
import Hero from './Hero/Hero';
import reportWebVitals from './reportWebVitals'
import JoinClient from './Client/JoinClient';
import PersonalDetails from './Forms/PersonalDetails'
import BusinessDetails from './Forms/BusinessDetails'
import ServiceDetails from './Forms/ServiceDetails';
import Request from './Forms/Request';
import Header from './components/Header';
import JoinWriter from "./Writer/JoinWriter";
import Cursor from './components/Cursor';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
    <Header />  
    <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/JoinClient" element={<JoinClient />} />
        <Route path='/Cursor' element={Cursor} />
        <Route path="/JoinWriter" element={<JoinWriter />} />
        <Route path="/PersonalDetails" element={<PersonalDetails />} />
        <Route path="/BusinessDetails" element={<BusinessDetails />} />
        <Route path="/ServiceDetails" element={<ServiceDetails />} />
        <Route path="/Request" element={<Request />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();