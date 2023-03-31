import React, { useContext } from 'react';
import AppContext from '../../context/Context';
// Req36
export default function RegisterInputName() {
  const { fullname, setFullnameText, handleInput } = useContext(AppContext);
  // Usar este ^ modelo para todos os inputs porque assim usa uma mesma função handleInput (no Provider)
  return (
    <label htmlFor="input-text">
      Nome
      <input
        data-testid="admin_manage__input-name"
        type="text"
        id="input-text"
        placeholder="Nome e sobrenome"
        value={ fullname }
        onChange={ (newText) => handleInput(newText, setFullnameText) }
      />
    </label>
  );
}
