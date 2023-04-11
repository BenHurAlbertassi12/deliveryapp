import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import OrderTable from '../components/OrderTable/CheckoutTable';
import AppContext from '../context/Context';
import APIFetch from '../Utils/API';
import useLocalStorage from '../Utils/useLocalStorage';

export default function Checkout() {
  const { cart, totalValues } = useContext(AppContext);

  // Vinicuis alterar a vontade
  const user = useLocalStorage('user')[0];
  const { id, token } = user;
  // console.log(user);

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [vendedor, setVendedor] = useState([]);
  const [vendedorId, setVendedorId] = useState(0);

  const navigate = useNavigate();

  const fetchVendedor = async () => {
    try {
      const { data } = await APIFetch('get', 'seller');
      setVendedorId(data[0].id);
      return setVendedor(data);
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    fetchVendedor();
  }, [setVendedorId, cart]);

  const handleSubmitButton = async (event) => {
    event.preventDefault();

    const totalPrice = totalValues();
    const header = { headers: { authorization: token } };

    try {
      const carrinho = JSON.parse(localStorage.getItem('cart'));
      const { data } = await APIFetch('post', 'customer/orders', {
        totalPrice,
        status: 'Pendente',
        saleDate: new Date(),
        sellerId: vendedorId,
        deliveryAddress,
        deliveryNumber,
        userId: id,
      }, header);
      await APIFetch('post', 'checkout', {
        id: data.id,
        products: [...carrinho],
      });
      navigate(`/customer/orders/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <OrderTable page="checkout" />
        {/* <h1> Finalizar pedido</h1> */}
      </div>
      <div>
        <h1> Detalhes e endereço para entrega</h1>
        <form>
          <label htmlFor="select-seller">
            Vendedora Responsável:
            <select
              type="text"
              id="select-seller"
              data-testid="customer_checkout__select-seller"
              onChange={ ({ target }) => setVendedorId(target.value) }
              required
            >
              {vendedor.length > 0
                && vendedor.map((item) => (
                  <option key={ item.id } value={ item.id }>
                    {item.name}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="address">
            Endereço
            <input
              type="text"
              id="address"
              data-testid="customer_checkout__input-address"
              value={ deliveryAddress }
              onChange={ ({ target }) => setDeliveryAddress(target.value) }
              required
            />
          </label>
          <label htmlFor="address-number">
            N:
            <input
              type="text"
              id="address-number"
              data-testid="customer_checkout__input-address-number"
              value={ deliveryNumber }
              onChange={ ({ target }) => setDeliveryNumber(target.value) }
              required
            />
          </label>
          <button
            type="submit"
            data-testid="customer_checkout__button-submit-order"
            onClick={ (event) => handleSubmitButton(event) }
          >
            Finalizar pedido
          </button>
        </form>
      </div>
    </div>
  );
}

// Página para não dar erro 404 enquanto passa no R1
