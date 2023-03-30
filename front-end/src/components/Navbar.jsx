import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
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
      <div
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {/* Nome está generico por enquanto */}
        <h3> name </h3>

      </div>
      <button type="button">
        <Link
          to="/"
          data-testid="customer_products__element-navbar-link-logout"
        // onClick={ }
        >
          Sair
        </Link>
      </button>
    </div>
  );
}

export default Navbar;
