import React from 'react';
import { useLocation } from 'react-router-dom';

const UserInicial = () => {
  const location = useLocation();
  const usuario = location.state?.usuario;

  return (
    <div>
      <h1>Bem-vindo, {usuario?.nome || 'usuário'}!</h1>
    </div>
  );
};

export default UserInicial;
