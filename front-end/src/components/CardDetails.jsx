import React, { useState, useEffect } from 'react';
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
  const dataTestidID = 'customer_orders__element-order-id-';
  const dataTestidStatus = 'customer_orders__element-delivery-status-';
  const dataTestidDate = 'customer_orders__element-order-date-';
  const dataTestidPrice = 'customer_orders__element-card-price-';

  const fetchSales = async () => {
    const header = { headers: { authorization: token } };
    // const carrinho = JSON.parse(localStorage.getItem('cart'));
    const { data } = await APIFetch('post', 'user/orders', { id }, header);
    setOrders(data);
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
            <Link to={ `/customer/orders/${order.id} ` }>
              <p data-testid={ `${dataTestidID}-${order.id}` }>
                <strong> Pedido:</strong>
                { addZeros(order.id) }
              </p>

              <p data-testid={ `${dataTestidStatus}-${order.id}` }>
                {order.status === 'Pendente'
                  ? <div style={ { color: '#d79a00', fontWeight: '900' } }>Pendente</div>
                  : <div style={ { color: '#539165', fontWeight: '900' } }>Entregue</div>}
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
