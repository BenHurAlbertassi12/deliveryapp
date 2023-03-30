import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function RegisterButton() {
  // Código para troca de página.
  const navigate = useNavigate(); // Não pode colocar hook dentro da função dentro do componente funcional.
  const routeChange = () => {
    navigate('/register');
  };

  return (
    <div>
      <button
        data-testid="common_login__button-register"
        type="button"
        onClick={ routeChange }
      >
        Ainda não tenho conta
      </button>
    </div>
  );
}

RegisterButton.propTypes = {
  routeChange: PropTypes.func,
}.isRequired;

// Página para não dar erro 404 enquanto passa no R1
