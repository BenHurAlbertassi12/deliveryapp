import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/Context';

export default function LoginButton() {
  const navigate = useNavigate();

  const { email, password, isButtonDisabled } = useContext(AppContext);

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const minNumber = 6;

  const onSubmit = () => {
    if (isButtonDisabled === true) {
      navigate('/customer/products');
    }
  };

  return (
    <button
      data-testid="common_login__button-login"
      type="submit"
      id="button-login"
      disabled={ !(password.length >= minNumber && emailValid) }
      onClick={ onSubmit }
    >
      Login
    </button>
  );
}
