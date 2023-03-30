import React, { useContext } from 'react';
import AppContext from '../../context/Context';
// Req2
export default function LoginInputEmail() {
  const { email, setEmailText, handleInput } = useContext(AppContext);
  // Usar este ^ modelo para todos os inputs porque assim usa uma mesma função handleInput (no Provider)
  return (
    <label htmlFor="input-email">
      Login
      <input
        data-testid="common_login__input-email"
        type="email"
        id="input-email"
        placeholder="email@trybeer.com.br"
        value={ email }
        onChange={ (newText) => handleInput(newText, setEmailText) }
      />
    </label>
  );
}
