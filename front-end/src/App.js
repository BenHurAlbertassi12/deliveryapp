import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AdminManagement from './pages/AdminManagement';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route
        path="/login"
        element={ <Login /> }
      />
      <Route
        path="/register"
        element={ <Register /> }
      />
      <Route
        path="/admin/manage"
        element={ <AdminManagement /> }
      />
      <Route path="/customer/products" element={ <Products /> } />
    </Routes>
  );
}

export default App;
