import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import APIFetch from '../Utils/API';
import useLocalStorage from '../Utils/useLocalStorage';
// import AppContext from '../context/Context';
import '../styles/details.css';

function CardDetails() {
  const [orders, setOrders] = useState([]);
  const user = useLocalStorage('user')[0];
  const { id, token } = user || {};

  // datatest
  const { pathname } = useLocation();
  const path = pathname.split('/')[1];
  const dataTestidID = `${path}_orders__element-order-id-`;
  const dataTestidStatus = `${path}_orders__element-delivery-status-`;
  const dataTestidDate = `${path}_orders__element-order-date-`;
  const dataTestidPrice = `${path}_orders__element-card-price-`;

  const status = {
    Pendente: { color: '#d79a00', fontWeight: '900' },
    Preparando: { color: '#243763', fontWeight: '900' },
    'Em Trânsito': { color: '#5D3891', fontWeight: '900' },
    Entregue: { color: '#367E18', fontWeight: '900' },
  };

  const fetchSales = async () => {
    const header = { headers: { authorization: token } };
    if (path === 'customer') {
      const { data } = await APIFetch('post', 'user/orders', { id }, header);
      setOrders(data);
    }
    if (path === 'seller') {
      const { data } = await APIFetch('post', 'seller/orders', { id }, header);
      setOrders(data);
    }
    // const carrinho = JSON.parse(localStorage.getItem('cart'));
  };

  useEffect(() => {
    fetchSales();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // converter string do valor total
  function convertPrice(value) {
    const brlValue = value.toString().replace('.', ',');
    return `R$ ${brlValue}`;
  }

  // converter data para dd/mm/yy
  function convertDate(data) {
    const date = new Date(data);
    return date.toLocaleDateString('pt-br');
  }

  // adicionar zeros a esquerda do pedido
  function addZeros(num) {
    const number = 4;
    const numberWithZeros = String(num).padStart(number, '0');
    return numberWithZeros;
  }

  return (
    <main>
      <Navbar />
      <div className="maincard details">
        <h3>Meus pedidos</h3>
        {orders.map((order) => (
          <div key={ order.id } className="cardetails">
            <Link to={ `/${path}/orders/${order.id} ` }>
              <p data-testid={ `${dataTestidID}-${order.id}` }>
                <strong> Pedido:</strong>
                { addZeros(order.id) }
              </p>
              <p data-testid={ `${dataTestidStatus}-${order.id}` }>
                <div style={ status[order.status] }>{order.status}</div>
              </p>
              <p>
                <strong> Data:</strong>
                <span data-testid={ `${dataTestidDate}-${order.id}` }>
                  { convertDate(order.saleDate) }

                </span>
              </p>

              <p data-testid={ `${dataTestidPrice}-${order.id}` } className="total">
                Preço total:
                { convertPrice(order.totalPrice) }
              </p>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default CardDetails;
