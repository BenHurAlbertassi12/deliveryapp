import {
  Link,
} from 'react-router-dom';
import useLocalStorage from '../Utils/useLocalStorage';

function Navbar() {
  const user = useLocalStorage('user');
  const { user: name } = user;
  console.log(`nome aqui = ${name} = resultado`);

  const handleExit = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <div>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </Link>
        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </Link>
        <p data-testid="customer_products__element-navbar-user-full-name">
          {Object.keys(user || {}).length ? user.name : 'Nome'}
        </p>
      </div>
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
