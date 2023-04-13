import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import { GoListUnordered } from 'react-icons/go';
import { HiHome } from 'react-icons/hi';
import { IoIosLogOut } from 'react-icons/io';
import useLocalStorage from '../Utils/useLocalStorage';
import '../styles/navbar.css';

function Navbar() {
  const user = useLocalStorage('user')[0];
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleExit = () => {
    localStorage.clear();
    navigate('/login');
  };

  function formatName(name) {
    const words = name.split(' ');
    const formattedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    );
    return formattedWords.join(' ');
  }
  return (
    <nav>
      <div className="navegation">
        { pathname.split('/')[1] === 'customer' ? ( // A aba PRODUTOS só deve aparecer no fluxo do Cliente; no fluxo do Vendedor não tem.
          <Link
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            <HiHome />
          </Link>) : '' }
        <Link
          to={ user.role === 'customer'
            ? '/customer/orders' : '/seller/orders' }
          data-testid="customer_products__element-navbar-link-orders"
        >
          { pathname.split('/')[1] === 'customer'
            ? <GoListUnordered /> : 'PEDIDOS'}
        </Link>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
          className="user"
        >
          {Object.keys(user || {}).length ? formatName(user.name) : 'Nome'}
        </p>
        <button type="button" className="logout">
          <Link
            to="/"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ handleExit }
          >
            <IoIosLogOut />
          </Link>
        </button>
      </div>
    </nav>
  );
}
export default Navbar;
