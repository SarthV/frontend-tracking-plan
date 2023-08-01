import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TrackingPlanList from './components/tracking-plan-list/tracking-plan-list';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App/>} />
      <Route exact path="/list" element={<TrackingPlanList/>} />
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);


reportWebVitals();
