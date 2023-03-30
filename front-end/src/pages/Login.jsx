import React, { useContext } from 'react';
import ErrorMessage from '../components/loginPage/ErrorMessage';
import LoginButton from '../components/loginPage/LoginButton';
import LoginInputEmail from '../components/loginPage/LoginInputEmail';
import LoginInputPassword from '../components/loginPage/LoginInputPassword';
import RegisterButton from '../components/loginPage/RegisterButton';
import AppContext from '../context/Context';

// Req2
export default function Login() {
  // Elementos/Componentes de Login do R2
  const { handleButtonClick } = useContext(AppContext);

  return (
    <div id="login-container">
      <form
        onSubmit={ handleButtonClick }
      >
        <h4>Oi do Login</h4>
        <LoginInputEmail />
        <LoginInputPassword />
        <LoginButton />
        <RegisterButton />
        <ErrorMessage />
      </form>
    </div>
  );
}

// Página para não dar erro 404 enquanto passa no R1
