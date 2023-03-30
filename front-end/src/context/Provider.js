import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './Context';

function Provider({ children }) {
  const [email, setEmailText] = useState('');
  const [password, setPasswordText] = useState('');

  const handleInput = ({ target: { value } }, func) => {
    func(value); // Pode utilizar em qualquer input, ao usar o setNOMEINPUT vai saber o que fazer com o useState
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
  };

  const context = useMemo(() => ({
    email,
    setEmailText,
    handleInput,
    password,
    setPasswordText,
    handleButtonClick,
  }), [
    email,
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
