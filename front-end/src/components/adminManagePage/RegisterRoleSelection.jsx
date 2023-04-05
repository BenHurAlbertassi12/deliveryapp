import React, { useContext } from 'react';
import AppContext from '../../context/Context';

export default function RegisterRoleSelection() {
  const { roleSelected, setRoleSelection } = useContext(AppContext);

  return (
    <label htmlFor="role-selector">
      Tipo
      <select
        data-testid="admin_manage__select-role"
        id="role-selector"
        onChange={ (event) => setRoleSelection(event.target.value) }
        value={ roleSelected }
      >
        <option value="seller">Seller</option>
        <option value="customer">Cliente</option>
      </select>
    </label>
  );
}
