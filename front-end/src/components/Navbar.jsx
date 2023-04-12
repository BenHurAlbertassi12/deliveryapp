import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import useLocalStorage from '../Utils/useLocalStorage';

function Navbar() {
  const user = useLocalStorage('user')[0];
  const { pathname } = useLocation();

  const handleExit = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      { pathname.split('/')[1] === 'customer' ? ( // A aba PRODUTOS só deve aparecer no fluxo do Cliente; no fluxo do Vendedor não tem.
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </Link>) : '' }
      <Link
        to={ pathname.split('/')[1] === 'customer'
          ? '/customer/orders' : '/seller/orders' }
        data-testid="customer_products__element-navbar-link-orders"
      >
        { pathname.split('/')[1] === 'customer'
          ? 'MEUS PEDIDOS' : 'PEDIDOS'}
      </Link>

      <p data-testid="customer_products__element-navbar-user-full-name">
        {Object.keys(user || {}).length ? user.name : 'Nome'}
      </p>
      <button type="button">
        <Link
          to="/"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleExit }
        >
          Sair
        </Link>
      </button>
    </div>
  );
}
export default Navbar;
