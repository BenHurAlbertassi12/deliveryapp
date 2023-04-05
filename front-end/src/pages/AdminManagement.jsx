import React, { useContext } from 'react';
import RegisterInputName from '../components/adminManagePage/RegisterInputName';
import RegisterRoleSelection from '../components/adminManagePage/RegisterRoleSelection';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import RegisterButton from '../components/adminManagePage/RegisterButton';
import AppContext from '../context/Context';

const n6 = 4;
const n12 = 12;

// Req36
export default function AdminManagement() {
  // Elementos/Componentes de Login do R36
  const {
    fullname,
    email,
    password,

    resetForm,
  } = useContext(AppContext);
  const emailValid = /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetForm();

    // Verifica se os dados do formulário são válidos
    if (
      fullname.length < n12
        || emailValid
        || password.length < n6
    ) {
      resetForm();
    }
  };

  return (
    <div id="admin-management-register-container">
      <h4>Cadastrar novo usuário</h4>
      <form
        onSubmit={ handleSubmit }
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
