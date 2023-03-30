import React, { useContext } from 'react';
import AppContext from '../../context/Context';

// Req2
export default function LoginInputPassword() {
  const { password, addPassword } = useContext(AppContext);
  // Usar este ^ modelo para todos os inputs porque assim usa uma mesma função handleInput (no Provider)
  return (
    <label htmlFor="input-password">
      Password
      <input
        data-testid="common_login__input-password"
        type="password"
        id="input-password"
        placeholder="*****"
        value={ password }
        onChange={ addPassword }
      />
    </label>
  );
}
