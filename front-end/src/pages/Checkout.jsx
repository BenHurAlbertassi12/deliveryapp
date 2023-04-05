import React,
{
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import AppContext from '../context/Context';
import APIFetch from '../Utils/API';
import useLocalStorage from '../Utils/useLocalStorage';
import OrderTable from '../components/OrderTable/CheckoutTable';

export default function Checkout() {
  const { cart, totalValues } = useContext(AppContext);

  // Vinicuis alterar a vontade
  const user = useLocalStorage('user')[0];
  const { email: userEmail } = user;
  console.log(user);

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [vendedor, setVendedor] = useState([]);
  const [vendedorId, setVendedorId] = useState(0);

  const navigate = useNavigate();

  const fetchVendedor = async () => {
    const { data } = await APIFetch('get', 'seller');
    setVendedorId(data[0].id);
    return setVendedor(data);
  };

  useEffect(() => {
    fetchVendedor();
  }, []);

  const handleSubmitButton = async (event) => {
    event.preventDefault();

    const totalPrice = totalValues();

    try {
      const { data } = await APIFetch('post', 'seller', {
        cart,
        totalPrice,
        vendedorId,
        deliveryAddress,
        deliveryNumber,
        userEmail,
      });
      return navigate(`/customer/orders/${data.saleId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div>
        <OrderTable />
        <h1> Finalizar pedido</h1>
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
