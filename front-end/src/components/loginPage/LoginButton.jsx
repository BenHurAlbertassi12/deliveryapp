import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/Context';
import APIFetch from '../../Utils/API';

export default function LoginButton() {
  const navigate = useNavigate();

  const { email, password, setMessageHidden } = useContext(AppContext);

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const minNumber = 6;

  const handleLoginSubmit = async () => {
    try {
      const payload = {
        email,
        password,
      };
      const response = await APIFetch('post', 'login', payload);
      console.log(response);
      if (response.data.role === 'customer') {
        navigate('/customer/products');
      }
      if (response.data.role === 'administrator') {
        navigate('/admin/manage');
      }
    } catch (error) {
      setMessageHidden(false);
      throw new Error();
    }
  };

  return (
    <button
      data-testid="common_login__button-login"
      type="submit"
      id="button-login"
      disabled={ !(password.length >= minNumber && emailValid) }
      onClick={ handleLoginSubmit }
    >
      Login
    </button>
  );
}
