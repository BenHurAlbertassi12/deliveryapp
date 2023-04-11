import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminManagement from './pages/AdminManagement';
import Details from './pages/Details';
import OrdersDetails from './pages/OrderDetails';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/admin/manage" element={ <AdminManagement /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/orders" element={ <Details /> } />
      <Route path="/customer/orders/:id" element={ <OrdersDetails /> } />
    </Routes>
  );
}

export default App;
// <Route path="/customer/order:id" element={ <Orders /> } />
