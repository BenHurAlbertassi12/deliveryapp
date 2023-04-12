import React/* , { useContext } */ from 'react';
import { useLocation } from 'react-router';
import Navbar from '../components/Navbar';
/* Sem utilidade: uma página só para detalhes de pedido: OrderDetails.jsx */
export default function SellerOrderDetails() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <main>
      <Navbar />
      <h4>SellerOrderDetails</h4>
    </main>
  );
}
