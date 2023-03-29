import React, { useState } from 'react';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const addName = (event) => {
    setName(event.target.value);
  };

  const addEmail = (event) => {
    setEmail(event.target.value);
  };

  const addPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError('Erro ao cadastrar o usuário.');
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
    </form>
  );
}

export default RegisterForm;

// Página para não dar erro 404 enquanto passa no R6
