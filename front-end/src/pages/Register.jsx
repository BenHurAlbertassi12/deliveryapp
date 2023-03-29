import React, { useState } from 'react';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const addName = (event) => {
    setName(event.target.value);
  };

  const addEmail = (event) => {
    setEmail(event.target.value);
  };

  const addPassword = (event) => {
    setPassword(event.target.value);
  };

  const n5 = 5;
  const n6 = 6;
  const n12 = 12;

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verifica se os dados do formulário são válidos
    if (
      name.length < n12
      || !email.includes('@')
      || !email.includes('.')
      || email.length < n5
      || password.length < n6
    ) {
      resetForm();
      setError('Dados inválidos');
    } else {
      resetForm();
      setSuccessMessage('Usuário cadastrado com sucesso!');
    }
  };

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

      <button type="submit" data-testid="common_register__button-register">
        Cadastrar
      </button>

      <div
        data-testid="common_register__element-invalid_register"
        style={ { display: error ? 'block' : 'none' } }
      >
        {error}
      </div>

      {successMessage && <div>{successMessage}</div>}
    </form>
  );
}

export default RegisterForm;
