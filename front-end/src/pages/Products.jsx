import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/Context';
import Navbar from '../components/Navbar';
import ProductCard from '../components/OrderTable/ProductCard';
import APIFetch from '../Utils/API';

function Products() {
  const [products, setProducts] = useState([]);
  const { sumTotal } = useContext(AppContext);
  const navigate = useNavigate();
  const [disable, setDisabled] = useState(true);

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
        console.log(error);
        localStorage.clear();
        navigate('/login');
      }
    }

    fetchProducts();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div>
        {products.map((product) => (
          <ProductCard product={ product } key={ product.id } />
        ))}
      </div>
      <button
        data-testid="customer_products__button-cart"
        type="button"
        onClick={ () => navigate('/customer/checkout') }
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
