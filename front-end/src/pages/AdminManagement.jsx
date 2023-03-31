import React, { useContext } from 'react';
import RegisterButton from '../components/adminManagePage/RegisterButton';
// import RegisterInputEmail from '../components/adminManagePage/RegisterInputEmail';
import RegisterInputName from '../components/adminManagePage/RegisterInputName';
import RegisterRoleSelection from '../components/adminManagePage/RegisterRoleSelection';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import AppContext from '../context/Context';

// Req36
export default function AdminManagement() {
  // Elementos/Componentes de Login do R36
  const { handleButtonClick } = useContext(AppContext);

  return (
    <div id="admin-management-register-container">
      <h4>Cadastrar novo usuário</h4>
      <form
        onSubmit={ handleButtonClick }
      >
        <RegisterInputName />
        <EmailInput />
        <PasswordInput />
        <RegisterRoleSelection />
        <RegisterButton />
      </form>
    </div>
  );
}
