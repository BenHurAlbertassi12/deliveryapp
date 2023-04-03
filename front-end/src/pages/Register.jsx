import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import AppContext from '../context/Context';

const n6 = 4;
const n12 = 12;

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [successMessage, setSuccessMessage] = useState('');
  const [formValid, setFormValid] = useState(false);
  const { handleRegister, isMessageHidden, setMessageHidden } = useContext(AppContext);
  const navigate = useNavigate();

  const isFormValid = () => name.length >= n12
    && email.includes('@')
    && email.includes('.')
    && password.length > n6;

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const addName = (event) => {
    setName(event.target.value);
    setFormValid(isFormValid());
  };

  const addEmail = (event) => {
    setEmail(event.target.value);
    setFormValid(isFormValid());
  };

  const addPassword = (event) => {
    setPassword(event.target.value);
    setFormValid(isFormValid());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica se os dados do formulário são válidos
    if (
      name.length < n12
      || !email.includes('@')
      || !email.includes('.')
      || password.length <= n6
    ) {
      console.log('Dados inválidos');
      resetForm();
      setError('Dados inválidos');
    } else {
      // Chama a função handleRegister com as informações de registro
      resetForm();
      try {
        // envia a requisição pro Handle dentro do context
        await handleRegister(name, email, password);
        // A mensagem de sucesso não aparece devido o redirecionamento
        // setSuccessMessage('Usuário cadastrado com sucesso!');
        setMessageHidden(true);
        navigate('/customer/products');
      } catch (err) {
        setError('Email já cadastrado');
      }
    }
  };

  // const onSubmit = () => navigate('/login');

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="common_register__input-name">
        Nome
        <input
          type="text"
          data-testid="common_register__input-name"
          value={ name }
          onChange={ addName }
        />
      </label>

      <label htmlFor="common_register__input-email">
        Email
        <input
          type="email"
          data-testid="common_register__input-email"
          value={ email }
          onChange={ addEmail }
        />
      </label>

      <label htmlFor="common_register__input-password">
        Senha:
        <input
          type="password"
          data-testid="common_register__input-password"
          value={ password }
          onChange={ addPassword }
        />
      </label>

      <button
        type="submit"
        data-testid="common_register__button-register"
        disabled={ !formValid }
      >
        Cadastrar
      </button>

      <div
        data-testid="common_register__element-invalid_register"
        style={ { display: !isMessageHidden ? 'block' : 'none' } }
      >
        {error}
      </div>

      {/* Essa parte não renderiza por causa do redirecionamento
      {successMessage && <div>{successMessage}</div>} */}
    </form>
  );
}

export default Register;
