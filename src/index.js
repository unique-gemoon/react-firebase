import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Input from './components/Input';
import Slideshow from './components/Slideshow';
import Login from './components/Login';
import { UserContextProvider  } from './contexts/UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <UserContextProvider>
      <React.StrictMode>
      <BrowserRouter>
      <Routes>
        <Route path='*' index element={<App />} />
        <Route path="input" element={<Input />}/>
        <Route path="slideshow" element={<Slideshow />}/>
      </Routes>
  </BrowserRouter>
  </React.StrictMode>
  </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
