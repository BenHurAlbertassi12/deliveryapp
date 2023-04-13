import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import RegisterInputName from '../components/adminManagePage/RegisterInputName';
import RegisterRoleSelection from '../components/adminManagePage/RegisterRoleSelection';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import RegisterButton from '../components/adminManagePage/RegisterButton';
import AppContext from '../context/Context';
import ErrorMessage from '../components/loginPage/ErrorMessage';
import APIFetch from '../Utils/API';
import useLocalStorage from '../Utils/useLocalStorage';

// Req36
export default function AdminManagement() {
  // Elementos/Componentes de Login do R36
  const {
    fullname,
    email,
    password,
    roleSelected,
    setMessageHidden,
    resetForm,
  } = useContext(AppContext);
  const { pathname } = useLocation();

  const userInfo = {
    name: fullname,
    email,
    password,
    role: roleSelected,
  };

  const adminToken = useLocalStorage('user')[0].token;
  const header = { headers: { authorization: adminToken } };

  // Req 38 e 39
  const handleSubmit = async (event) => {
    event.preventDefault();
    resetForm();

    try {
      const response = await
      APIFetch('post', pathname.substring(1), userInfo, header);
      // substring: https://tecadmin.net/remove-first-character-from-string-in-javascript/#:~:text=in%20a%20string.-,To%20remove%20the%20first%20character%20from%20a%20string%20using%20the,it%20with%20an%20empty%20string.&text=2-,let%20str%20%3D%20%22Hello%20World!%22%3B,%3B%20%2F%2F%20%22ello%20World!%22;

      setMessageHidden(true); // Esconde
      resetForm();
      return response.data.token;
    } catch (err) {
      setMessageHidden(false); // Aparece
    }
  };
  return (
    <main className="login">
      <h2>Cadastrar novo usuário</h2>
      <form
        onSubmit={ handleSubmit }
        className="boxadmin"
      >
        <RegisterInputName />
        <EmailInput />
        <PasswordInput />
        <RegisterRoleSelection />
        <RegisterButton />
        <ErrorMessage />
      </form>
    </main>
  );
}
