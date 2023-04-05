import {
  useState,
  useMemo,
  useCallback,
} from 'react';

import PropTypes from 'prop-types';
import AppContext from './Context';
import APIFetch from '../Utils/API';

function Provider({ children }) {
  const [email, setEmailText] = useState(''); // R2, 36 e 37
  const [password, setPasswordText] = useState(''); // R2, 36 e 37
  const [fullname, setFullnameText] = useState(''); // R36 e 37
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isMessageHidden, setMessageHidden] = useState(true);
  const [roleSelected, setRoleSelection] = useState('seller'); // R36 e 37

  const resetForm = () => {
    setFullnameText('');
    setEmailText('');
    setPasswordText('');
    setRoleSelection('seller');
  };

  // Requisitos product
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState([]);

  const altQuantidade = (altProd) => {
    const updatedCart = altProd.quantity === 0
      ? cart.filter((filterProd) => filterProd.id !== altProd.id)
      : cart.map((prod) => {
        if (prod.id === altProd.id) {
          prod.quantity = altProd.quantity;
        }
        return prod;
      });

    setCart(updatedCart);
    console.log(updatedCart, 'cart');
  };

  const totalValues = () => {
    const totalValue = cart.reduce((acc, cur) => {
      const price = Number(cur.price);
      const value = cur.quantity * price;
      return acc + value;
    }, 0);
    return totalValue;
  };

  // Fim requisitos products

  const getAPI = async (method, endpoint, payload) => {
    try {
      const response = await APIFetch(method, endpoint, payload);
      return response;
    } catch (err) {
      throw new Error();
    }
  };

  const addEmail = (event) => {
    setEmailText(event.target.value);
  };

  const addPassword = (event) => {
    setPasswordText(event.target.value);
  };

  const handleInput = ({ target: { value } }, func) => {
    func(value); // R2, 36 e 37
  };

  const handleButtonClick = useCallback((event) => {
    event.preventDefault(); // R2, 36
    resetForm();
  }, []);

  const hideErrorMessage = async () => { // R2
    const response = await fetch('/login');
    const notFoundHttpStatus = 404;

    if (response.ok) return false;
    if (response.status === notFoundHttpStatus) return true;
  };

  const context = useMemo(() => ({
    altQuantidade,
    totalValues,
    email,
    setEmailText,
    addEmail,
    handleInput,
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
    roleSelected,
    setRoleSelection,
    resetForm,
    handleButtonClick,
    getAPI,
  }), [
    order,
    setOrder,
    email,
    isButtonDisabled,
    setButtonDisabled,
    setEmailText,
    password,
    setPasswordText,
    fullname,
    isMessageHidden,
    roleSelected,
    setRoleSelection,
    handleButtonClick,
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

/*
A função handleRegister foi movida para Register pois, estava dando conflito,
la ela entrou sem problemas
*/
