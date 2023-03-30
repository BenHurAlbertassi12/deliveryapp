import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';

function Provider({ children }) {
  const [email, setEmailText] = useState('');
  const [password, setPasswordText] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);

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
  }), [
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
