import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../index.css';
import '../tailwind.css';
import App from './App'; 
import reportWebVitals from './reportWebVitals';
import AsAClient from './Forms/AsAClient';
import PersonalDetails from './Forms/PersonalDetails';
import BusinessDetails from './Forms/BusinessDetails'; // Add this import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Client" element={<AsAClient />} />
        <Route path="/PersonalDetails" element={<PersonalDetails />} />
        <Route path="/BusinessDetails" element={<BusinessDetails />} /> {/* Add this route */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
