import React, { useContext } from 'react';
import AppContext from '../../context/Context';

export default function RegisterRoleSelection() {
  const { roleSelected, setRoleSelection } = useContext(AppContext);

  function selectHandle({ target: value }) {
    setRoleSelection(value);
  }

  return (
    <label htmlFor="role-selector">
      Tipo
      <select
        data-testid="admin_manage__select-role"
        id="role-selector"
        onChange={ (event) => selectHandle(event) }
        value={ roleSelected }
      >
        <option value="seller">Seller</option>
        <option value="customer">Cliente</option>
      </select>
    </label>
  );
}
