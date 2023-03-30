import React, { useContext } from 'react';
import AppContext from '../../context/Context';

export default function ErrorMessage() {
  const { hideErrorMessage } = useContext(AppContext);

  return (
    <p
      data-testid="common_login__element-invalid-email"
      hidden={ hideErrorMessage() }
    >
      Elemento que deve ser oculto (Mensagem de erro)

    </p>
  );
}
