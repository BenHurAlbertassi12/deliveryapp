import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import AppContext from '../context/Context';

// Req2 e 36
export default function PasswordInput() {
  const { password, setPasswordText, handleInput } = useContext(AppContext);
  const { pathname } = useLocation();
  // Usar este ^ modelo para todos os inputs porque assim usa uma mesma função handleInput (no Provider)
  return (
    <label
      htmlFor="input-password"
    >
      Password
      <input
        data-testid={ pathname === '/login'
          ? 'common_login__input-password' : 'admin_manage__input-password' }
        type="password"
        id="input-password"
        placeholder="******"
        value={ password }
        onChange={ (newText) => handleInput(newText, setPasswordText) }
      />
    </label>
  );
}
