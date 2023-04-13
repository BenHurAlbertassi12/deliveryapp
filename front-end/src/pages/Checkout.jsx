import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Navbar from '../components/Navbar';
import OrderTable from '../components/OrderTable/CheckoutTable';
import AppContext from '../context/Context';
import APIFetch from '../Utils/API';
import useLocalStorage from '../Utils/useLocalStorage';
import '../styles/checkout.css';

export default function Checkout() {
  const { cart, totalValues } = useContext(AppContext);

  // Vinicuis alterar a vontade
  const user = useLocalStorage('user')[0];
  const { id, token } = user;
  // console.log(user);

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [vendedor, setVendedor] = useState([]);
  const [vendedorId, setVendedorId] = useState(2);

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

  const routeChange = () => {
    navigate('/customer/products');
  };

  return (
    <main>
      <Navbar />
      <div className="maincard details">
        <h3> Finalizar pedido</h3>
        <OrderTable page="checkout" />
        <form className="formcheck">
          <h3> Detalhes e endereço para entrega</h3>
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
            <input
              type="text"
              id="address"
              data-testid="customer_checkout__input-address"
              placeholder="Endereço"
              value={ deliveryAddress }
              onChange={ ({ target }) => setDeliveryAddress(target.value) }
              required
            />
          </label>
          <label htmlFor="address-number">
            <input
              type="text"
              id="address-number"
              data-testid="customer_checkout__input-address-number"
              value={ deliveryNumber }
              placeholder="Número"
              onChange={ ({ target }) => setDeliveryNumber(target.value) }
              required
            />
          </label>
          <button
            type="submit"
            data-testid="customer_checkout__button-submit-order"
            onClick={ (event) => handleSubmitButton(event) }
            className="borderadius"
          >
            Finalizar pedido
          </button>
          <button
            type="button"
            onClick={ routeChange }
            className="button-register continue"
          >
            <AiOutlineArrowLeft className="icon" />
            continuar comprando
          </button>
        </form>
      </div>
    </main>
  );
}

// Página para não dar erro 404 enquanto passa no R1
