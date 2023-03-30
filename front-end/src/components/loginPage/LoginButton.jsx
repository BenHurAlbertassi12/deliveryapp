// import React, { useContext } from 'react';
// import AppContext from '../../context/Context';

// Req2

export default function LoginButton() {
  // const { email, setEmailText, handleInput } = useContext(AppContext); - Para caso precisar no futuro
  return (
    <button
      data-testid="common_login__button-login"
      type="submit"
      id="button-login"
    >
      Login
    </button>
  );
}
