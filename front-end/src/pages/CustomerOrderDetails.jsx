import React/* , { useContext } */ from 'react';
import { useLocation } from 'react-router';
import Navbar from '../components/Navbar';
/* Sem utilidade: uma página só para detalhes de pedido: OrderDetails.jsx */
export default function CustomerOrderDetails() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <main>
      <Navbar />
      <h4>CustomerOrderDetails</h4>
    </main>
  );
}
