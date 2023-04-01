import React, { useContext } from 'react';
import AppContext from '../../context/Context';

export default function ErrorMessage() {
  const { isMessageHidden } = useContext(AppContext);

  return (
    <p
      data-testid="common_login__element-invalid-email"
      hidden={ isMessageHidden }
    >
      {/* Elemento que deve ser oculto (Mensagem de erro) */}
      Usuario ou Password não encontrado!
    </p>
  );
}
