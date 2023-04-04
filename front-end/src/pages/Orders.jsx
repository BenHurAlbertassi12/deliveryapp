import { useState } from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderTable/OrderCard';
import APIFetch from '../Utils/API';

function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const { data } = await APIFetch('get', 'sale', '');
    setOrders(data);
  };

  return (
    <div>
      <Navbar />
      {orders.map((item) => (
        <div key={ item.id }>
          <OrderCard order={ getOrders } />
        </div>
      ))}
    </div>
  );
}

export default Orders;
