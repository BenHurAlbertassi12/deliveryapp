import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/Context';
// Req 2 e 36
export default function EmailInput() {
  const { email, addEmail } = useContext(AppContext);
  const { pathname } = useLocation();

  // Usar este ^ modelo para todos os inputs porque assim usa uma mesma função handleInput (no Provider)
  return (
    <label
      htmlFor="input-email"
    >
      Email
      <input
        data-testid={ pathname === '/login'
          ? 'common_login__input-email' : 'admin_manage__input-email' }
        type="email"
        id="input-email"
        placeholder="seu-email@superb.com"
        value={ email }
        onChange={ addEmail }
      />
    </label>
  );
}
