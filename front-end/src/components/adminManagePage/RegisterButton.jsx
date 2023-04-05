import React, { useContext } from 'react';
import AppContext from '../../context/Context';

export default function RegisterButton() {
  const { fullname, email, password } = useContext(AppContext);

  // Req 37
  const emailValid = /\S+@\S+\.\S+/.test(email);
  const no6 = 6;
  const no12 = 12;

  // Req36
  return (
    <button
      data-testid="admin_manage__button-register"
      type="submit"
      disabled={ !(password.length >= no6 && emailValid && fullname.length >= no12) }
    >
      Cadastrar
    </button>
  );
}
