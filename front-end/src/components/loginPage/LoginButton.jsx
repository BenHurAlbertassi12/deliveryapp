import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import AppContext from '../../context/Context';
import useLocalStorage from '../../Utils/useLocalStorage';

export default function LoginButton() {
  const { getAPI, email, password, setMessageHidden, resetForm } = useContext(AppContext);
  const navigate = useNavigate();
  const setUserStorage = useLocalStorage('user')[1];

  const emailValid = /\S+@\S+\.\S+/.test(email);
  const minNumber = 6;

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    resetForm();

    const payload = {
      email,
      password,
    };

    try {
      const response = await getAPI('post', 'login', payload);
      setUserStorage(response.data);
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
      className="button"
    >
      Login
    </button>
  );
}
