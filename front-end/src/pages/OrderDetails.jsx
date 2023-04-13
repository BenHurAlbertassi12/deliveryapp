import React, { useCallback, useEffect, useState/* , useContext */ } from 'react';
import { useLocation } from 'react-router';
import Navbar from '../components/Navbar';
import OrderTable from '../components/OrderTable/CheckoutTable';
import APIFetch from '../Utils/API';

// R30
export default function OrderDetails() {
  const { pathname } = useLocation();
  const [orderData, setOrderData] = useState();
  const statuses = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];

  const customerDTI = 'customer_order_details__';
  const sellerDTI = 'seller_order_details__';
  const dTISellerName = 'customer_order_details__element-order-details-label-seller-name';
  const dTIStatus = 'element-order-details-label-delivery-status';
  // const [orderStatus, setOrderStatus] = useState(); // R32

  // R25 e 30
  const getOrderInfo = useCallback(async () => { // https://devtrium.com/posts/async-functions-useeffect
    const response = await
    APIFetch('get', pathname.substring(1)); // param endpoint é customer/orders/:id
    setOrderData(response.data);
  }, [pathname]);

  useEffect(() => {
    getOrderInfo();
  });

  // adicionar zeros a esquerda do pedido
  function addZeros(num) {
    const number = 4;
    const numberWithZeros = String(num).padStart(number, '0');
    return numberWithZeros;
  }

  async function handleButton(event) { // R32
    switch (event.target.id) {
    case 'deliveryButton':
      await APIFetch('patch', pathname.substring(1), { status: statuses[3] });
      setOrderData({ ...orderData, status: statuses[3] });
      break;
    case 'preparingButton':
      await APIFetch('patch', pathname.substring(1), { status: statuses[1] });
      setOrderData({ ...orderData, status: statuses[1] });
      break;
    case 'dispatchButton':
      await APIFetch('patch', pathname.substring(1), { status: statuses[2] });
      setOrderData({ ...orderData, status: statuses[2] });
      break;
    default:
      break;
    }
  }

  function customerButton() { // Visão do cliente Req 26
    const { status } = orderData;
    let isButtonDisabled = true;

    if (status === statuses[2]) isButtonDisabled = false;

    return (
      <button
        data-testid="customer_order_details__button-delivery-check"
        onClick={ handleButton }
        type="button"
        disabled={ isButtonDisabled }
        id="deliveryButton"
        className="button"
      >
        Marcar como entregue
      </button>
    );
  }

  function sellerButtons() { // Visão do vendedor Req 26
    const { status } = orderData;
    let isPreparingButtonDisabled = false;
    let isDispatchButtonDisabled = true;

    switch (status) {
    case 'Pendente':
      isPreparingButtonDisabled = false;
      isDispatchButtonDisabled = true;
      break;
    case 'Preparando':
      isPreparingButtonDisabled = true;
      isDispatchButtonDisabled = false;
      break;
    case 'Entregue':
      isPreparingButtonDisabled = true;
      isDispatchButtonDisabled = true;
      break;
    default:
      isDispatchButtonDisabled = true;
      isPreparingButtonDisabled = true;
      break;
    }

    return (
      <>
        <button
          data-testid="seller_order_details__button-preparing-check"
          type="button"
          onClick={ handleButton }
          disabled={ isPreparingButtonDisabled }
          id="preparingButton"
          className="button"
        >
          Preparar pedido
        </button>
        <button
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ handleButton }
          type="button"
          disabled={ isDispatchButtonDisabled }
          id="dispatchButton"
          className="button"
        >
          Saiu para Entrega
        </button>
      </>
    );
  }

  if (orderData === undefined) { return <h1>Loading</h1>; }
  if (orderData !== undefined) {
    const { id, saleDate, status, seller: { name } } = orderData;
    return (
      <main>
        <Navbar />
        <div className="maincard details">
          <section className="orderdetails">
            <h4
              data-testid={ pathname.split('/')[1] === 'customer' // divide em 6 partes: / customer / orders / :id
                ? `${customerDTI}element-order-details-label-order-id`
                : 'seller_order_details__element-order-details-label-order-id' }
            >
              <strong>Pedido: </strong>
              { addZeros(id) }
            </h4>
            <h4
              data-testid={ pathname.split('/')[1] === 'customer'
                ? `${customerDTI}element-order-details-label-order-date`
                : 'seller_order_details__element-order-details-label-order-date' }
            >
              {new Date(saleDate).toLocaleDateString('en-GB')}
            </h4>
            { pathname.split('/')[1] === 'customer'
              ? <h4 data-testid={ dTISellerName }>{name}</h4>
              : '' }
            { pathname.split('/')[1] === 'customer'
              ? <h4 data-testid={ `${customerDTI}${dTIStatus}${id}` }>{ status }</h4>
              : <h4 data-testid={ `${sellerDTI}${dTIStatus}` }>{ status }</h4>}
          </section>
          { pathname.split('/')[1] === 'customer'
            ? customerButton()
            : sellerButtons() }
          <OrderTable page="order_details" saleProducts={ orderData } />
        </div>
      </main>
    );
  }
}
