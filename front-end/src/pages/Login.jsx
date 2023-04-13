import React, { useContext } from 'react';
import EmailInput from '../components/EmailInput';
import ErrorMessage from '../components/loginPage/ErrorMessage';
import LoginButton from '../components/loginPage/LoginButton';
import RegisterButton from '../components/loginPage/RegisterButton';
import PasswordInput from '../components/PasswordInput';
import AppContext from '../context/Context';
import Logo from '../images/bardrink.png';
import '../styles/appmock.css';

// Req2
export default function Login() {
  // Elementos/Componentes de Login do R2
  const { handleButtonClick } = useContext(AppContext);

  return (
    <main className="login">
      <div className="logo">
        <img src={ Logo } alt="" />
      </div>
      <h1> Sign in</h1>
      <p className="sub">Faça seu login para fazer um pedido.</p>
      <p />
      <form
        onSubmit={ handleButtonClick }
        className="form"
      >
        <div className="margintop">
          <EmailInput />
          <PasswordInput />
          <LoginButton />
          <RegisterButton />
          <ErrorMessage />
        </div>
      </form>
    </main>
  );
}

// Página para não dar erro 404 enquanto passa no R1
