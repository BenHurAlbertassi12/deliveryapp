import React from 'react';

function Header() {
  return (
    <div className="navbar">
      <div
        className="navbar-item"
        data-testid="customer_products__element-navbar-link-orders"
      >
        Gerenciar Usuários
      </div>
      <div
        className="navbar-item"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        Trybeer Admin
      </div>
      <div
        className="navbar-item"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </div>
    </div>
  );
}

export default Header;
