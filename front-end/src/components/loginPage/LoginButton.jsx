import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/Context';

export default function LoginButton() {
  const navigate = useNavigate();

  const { email, password, isButtonDisabled, setMessageHidden } = useContext(AppContext);

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const minNumber = 6;

  const onSubmit = async () => {
    const response = await fetch('http://localhost:3000/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
    }).then((res) => res).then((json) => json);
    console.log(response);

    const errorStatus = 404;
    if (response.ok) setMessageHidden(false);
    if (response.status === errorStatus) setMessageHidden(true);

    if (isButtonDisabled === false && response.ok) {
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
