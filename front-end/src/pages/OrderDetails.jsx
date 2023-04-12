import React, { useCallback, useEffect, useState/* , useContext */ } from 'react';
import { useLocation } from 'react-router';
import Navbar from '../components/Navbar';
import OrderTable from '../components/OrderTable/CheckoutTable';
import APIFetch from '../Utils/API';
// import AppContext from '../context/Context';

export default function OrderDetails() {
  const { pathname } = useLocation();
  const [orderData, setOrderData] = useState();
  // const { saleProducts, setSaleProducts } = useContext(AppContext);
  // const [orderStatus, setOrderStatus] = useState(); // R32
  const customerDTI = 'customer_order_details__';
  const sellerDTI = 'seller_order_details__';
  const dTISellerName = 'customer_order_details__element-order-details-label-seller-name';
  const dTIStatus = 'element-order-details-label-delivery-status';
  // const statuses = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue '];

  // R25 e 30
  const getOrderInfo = useCallback(async () => { // https://devtrium.com/posts/async-functions-useeffect
    // const id = pathname.split('/')[3];
    const response = await
    APIFetch('get', pathname.substring(1)); // param endpoint é customer/orders/:id
    // const products = await
    // APIFetch('post', 'products-sales', { id });
    setOrderData(response.data);
    // setSaleProducts(products);
    // console.log(products);
  }, [pathname]);

  useEffect(() => {
    getOrderInfo();
  }, []);

  const handleButton = async () => {
    /* Req32: Na tela do cliente o texto/label dTIStatus segue a ordem Pendente; - Preparando; - Em Trânsito; - Entregue. Quando o botão é clicado ele passará o label de um texto para outro. Para a página/o elemento remontar, precisa usar o state: um estado que está no Provider, pois esse mesmo state será usado em /customer/orders/:id e /seller/orders/:id. */
    // if (orderStatus === 2) {
    //   setOrderStatus(statuses[+1]);
    // }
    // setOrderStatus(statuses[+1]);
    // const orderResponse = await
    // APIFetch('post', pathname.substring(1), );
    console.log('Entregue');
  };

  function buttonDeliveryCheck() { // Visão do cliente
    const { status } = orderData;
    let isButtonDisabled = true;

    if (status === 'Em Trânsito') isButtonDisabled = false;

    return (
      <button
        data-testid="customer_order_details__button-delivery-check"
        onChange={ handleButton }
        type="button"
        disabled={ isButtonDisabled }
      >
        Marcar como entregue
      </button>
    );
  }

  function buttonDispatchCheck() { // Visão do vendedor
    const { status } = orderData;
    let message = 'Saiu para entrega';
    let isButtonDisabled = false;
    switch (status) {
    case 'Pendente':
      message = 'Para preparo';
      isButtonDisabled = false;
      break;
    case 'Preparando' || 'Em Trânsito' || 'Entregue':
      message = 'Para preparo';
      isButtonDisabled = true;
      break;

    default:
      break;
    }
    return (
      <button
        data-testid="seller_order_details__button-dispatch-check"
        onChange={ handleButton }
        type="button"
        disabled={ isButtonDisabled }
      >
        { message }
      </button>
    );
  }

  if (orderData === undefined) { return <h1>Loading</h1>; }
  if (orderData !== undefined) {
    const { id, saleDate, status, seller: { name } } = orderData;
    console.log(status);
    return (
      <main>
        <Navbar />
        <h4
          data-testid={ pathname.split('/')[1] === 'customer' // divide em 6 partes: / customer / orders / :id
            ? `${customerDTI}element-order-details-label-order-id`
            : 'seller_order_details__element-order-details-label-order-id' }
        >
          PEDIDO
          {id}
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
        { pathname.split('/')[1] === 'customer'
          ? buttonDeliveryCheck()
          : buttonDispatchCheck() }
        <OrderTable page="order_details" saleProducts={ orderData } />
      </main>
    );
  }
}
