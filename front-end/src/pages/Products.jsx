import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/OrderTable/ProductCard';
import AppContext from '../context/Context';
import APIFetch from '../Utils/API';
import useLocalStorage from '../Utils/useLocalStorage';

function Products() {
  const [products, setProducts] = useState([]);
  const { sumTotal, getCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [disable, setDisabled] = useState(true);
  const setCartStorage = useLocalStorage('cart')[1];

  const allowCartButton = () => {
    if (sumTotal > 0) return setDisabled(false);
    return setDisabled(true);
  };

  useEffect(() => {
    allowCartButton();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sumTotal]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productDB = await APIFetch('get', 'products', '');
        setProducts(productDB.data);
      } catch (error) {
        localStorage.clear();
        navigate('/login');
      }
    }

    fetchProducts();
  }, [navigate]);

  function handleCartBtn() {
    const cartProducts = getCart();
    setCartStorage(cartProducts);
    navigate('/customer/checkout');
  }

  return (
    <div>
      <Navbar />
      <div>
        {products.map((product) => (
          <ProductCard
            product={ product }
            dataSize={ products.length } // Adicionado para criação de um array na ProductCard
            key={ product.id }
          />
        ))}
      </div>
      <button
        data-testid="customer_products__button-cart"
        type="button"
        onClick={ () => handleCartBtn() }
        disabled={ disable }
      >
        Ver carrinho: R$
        {' '}
        <span data-testid="customer_products__checkout-bottom-value">
          { `${sumTotal.toString().replace('.', ',')}` }
        </span>
      </button>
    </div>
  );
}

export default Products;
