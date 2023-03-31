import React, { useContext } from 'react';
import AppContext from '../../context/Context';

export default function RegisterRoleSelection() {
  const { roleSelected, setRoleSelection } = useContext(AppContext);

  function change(event) {
    setRoleSelection({ value: event.target.value });
  }

  return (
    <label htmlFor="role-selector">
      Tipo
      <select
        data-testid="admin_manage__select-role"
        id="role-selector"
        onChange={ change }
        value={ roleSelected }
      >
        <option value="valor1">Valor1</option>
        <option value="valor2">Valor2</option>
      </select>
    </label>
  );
}
