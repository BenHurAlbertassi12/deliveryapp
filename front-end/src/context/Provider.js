import {
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import axios from 'axios';
import AppContext from './Context';

function Provider({ children }) {
  const [email, setEmailText] = useState('');
  const [password, setPasswordText] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const history = useNavigate();

  const addEmail = (event) => {
    setEmailText(event.target.value);
  };

  const addPassword = (event) => {
    setPasswordText(event.target.value);
  };

  const handleInput = ({ target: { value } }, func) => {
    func(value); // Pode utilizar em qualquer input, ao usar o setNOMEINPUT vai saber o que fazer com o useState
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
  };

  const hideErrorMessage = async () => {
    const response = await fetch('/login');
    const notFoundHttpStatus = 404;

    if (response.ok) return false;
    if (response.status === notFoundHttpStatus) return true;
  };

  const handleRegister = useCallback(async () => {
    try {
      const hashedPassword = md5(formData.password); // Converte a senha para hash md5
      const response = await axios.post('http://localhost:3000/register', {
        name: formData.name,
        email: formData.email,
        password: hashedPassword, // Envia a senha convertida para o back-end
      });
      history.push('/customer/products');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [formData, history]);

  const context = useMemo(() => ({
    email,
    setEmailText,
    handleInput,
    password,
    setPasswordText,
    handleButtonClick,
    setButtonDisabled,
    isButtonDisabled,
    addEmail,
    addPassword,
    hideErrorMessage,
    setFormData,
    handleRegister,
  }), [
    handleRegister,
    email,
    isButtonDisabled,
    setButtonDisabled,
    setEmailText,
    password,
    setPasswordText,
  ]);

  // children são os elementos/o <App>
  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape(),
}.isRequired;

export default Provider;
