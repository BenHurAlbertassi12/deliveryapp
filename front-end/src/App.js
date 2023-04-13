import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import AdminManagement from './pages/AdminManagement';
import Details from './pages/Details';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/orders/" element={ <Details /> } />
      <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
      <Route path="/seller/orders/:id" element={ <OrderDetails /> } />
      <Route path="/admin/manage" element={ <AdminManagement /> } />
    </Routes>
  );
}

export default App;
// <Route path="/customer/order:id" element={ <Orders /> } />
