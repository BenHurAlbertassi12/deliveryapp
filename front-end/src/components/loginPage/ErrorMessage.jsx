// import React, { useContext } from 'react';
// import AppContext from '../../context/Context';

export default function ErrorMessage() {
  // const { email, setEmailText, handleInput } = useContext(AppContext); // Para caso precisar no futuro algo parecido
  return (
    <p
      data-testid="common_login__element-invalid-email"
    >
      Elemento que deve ser oculto (Mensagem de erro)

    </p>
  );
}
