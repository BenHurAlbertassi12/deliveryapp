import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import AppContext from '../../context/Context';

export default function ErrorMessage() {
  const { isMessageHidden } = useContext(AppContext);
  const { pathname } = useLocation();

  const showMessage = () => {
    const messageText = pathname === '/login'
      ? 'Usuário ou Password não encontrado!' : 'Usuário já existe!';
    return messageText;
  };

  return (
    <p
      data-testid={ pathname === '/login'
        ? 'common_login__element-invalid-email'
        : 'admin_manage__element-invalid-register' }
      hidden={ isMessageHidden }
      className="error"
    >
      {/* Elemento que deve ser oculto (Mensagem de erro) */}
      {showMessage()}
    </p>
  );
}
