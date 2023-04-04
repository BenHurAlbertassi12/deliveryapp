import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/Context';
import Navbar from '../components/Navbar';
import ProductCard from '../components/OrderTable/ProductCard';
import APIFetch from '../Utils/API';

function Products() {
  const [products, setProducts] = useState([]);
  const { totalValues } = useContext(AppContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchProducts();
  }, []);

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
        disabled={ totalValues() === 0 }
      >
        Ver carrinho: R$
        {' '}
        <span data-testid="customer_products__checkout-bottom-value">
          {totalValues().toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
          })}
        </span>
      </button>
    </div>
  );
}

export default Products;
