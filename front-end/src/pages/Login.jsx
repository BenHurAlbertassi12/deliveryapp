import React from 'react';
import ErrorMessage from '../components/loginPage/ErrorMessage';
import LoginInputEmail from '../components/loginPage/LoginInputEmail';
import LoginInputPassword from '../components/loginPage/LoginInputPassword';
import RegisterButton from '../components/loginPage/RegisterButton';

// Req2
export default function Login() {
  // Elementos/Componentes de Login do R2
  return (
    <div id="login-container">
      <h4>Oi do Login</h4>
      <LoginInputEmail />
      <LoginInputPassword />
      <Login />
      <RegisterButton />
      <ErrorMessage />
    </div>
  );
}

// Página para não dar erro 404 enquanto passa no R1
