import * as React from 'react';
import { Link } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';

function SellerOrders() {
  const handleExit = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <main>
      <div className="maincard">
        <Link to="/seller/orders/3">pedido 3</Link>
        <Link
          to="/"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleExit }
        >
          <IoIosLogOut />
        </Link>
      </div>
    </main>
  );
}

export default SellerOrders;
