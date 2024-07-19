import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../index.css'
import '../tailwind.css'
import App from './App';
import reportWebVitals from './reportWebVitals'
import AsAClient from './Forms/AsAClient'
import PersonalDetails from './Forms/PersonalDetails'
import BusinessDetails from './Forms/BusinessDetails'
import ServiceDetails from './Forms/ServiceDetails';
import Request from './Forms/Request';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Client" element={<AsAClient />} />
        <Route path="/PersonalDetails" element={<PersonalDetails />} />
        <Route path="/BusinessDetails" element={<BusinessDetails />} />
        <Route path="/ServiceDetails" element={<ServiceDetails />} />
        <Route path="/Request" element={<Request />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();