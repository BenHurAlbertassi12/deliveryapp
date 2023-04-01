import {
  useState,
  useMemo,
  useCallback,
} from 'react';

import PropTypes from 'prop-types';
import AppContext from './Context';
import APIFetch from '../Utils/API';

function Provider({ children }) {
  const [email, setEmailText] = useState('');
  const [password, setPasswordText] = useState('');
  const [fullname, setFullnameText] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isMessageHidden, setMessageHidden] = useState(true);

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

  const handleRegister = useCallback(async (name, mail, pass) => {
    try {
      // const hashedPassword = md5(formData.password) - Deixei a conversão por conta do back-end - Vinicius; // Converte a senha para hash md5
      const response = await APIFetch('post', 'register', {
        name,
        email: mail,
        password: pass,
      });
      // Se deixar o push pra customer tem que gerar o token no cadastro do usuario, mandei ele pra realizar o login
      // history.push('/customer/products');
      return response.data;
    } catch (error) {
      setMessageHidden(false);
      throw new Error();
    }
  }, []);

  const context = useMemo(() => ({
    email,
    setEmailText,
    addEmail,
    handleInput,
    handleButtonClick,
    isButtonDisabled,
    setButtonDisabled,
    password,
    setPasswordText,
    addPassword,
    isMessageHidden,
    setMessageHidden,
    fullname,
    setFullnameText,
    hideErrorMessage,
    handleRegister,
  }), [
    handleRegister,
    email,
    isButtonDisabled,
    setButtonDisabled,
    setEmailText,
    password,
    setPasswordText,
    fullname,
    isMessageHidden,
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
