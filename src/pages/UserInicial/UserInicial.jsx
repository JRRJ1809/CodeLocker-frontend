import React from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './UserInicial.css';

const UserInicial = () => {
  const navigate = useNavigate();
  const [lockStatus] = React.useState('aberta'); // Estado fixo (sem toggle)

  return (
    <div className="app-container">
      {/* Barra Vermelha Superior com Logo */}
      <header className="red-header">
        <div className="logo-container">
          <img src={senaiLogo} alt="Logo SENAI" className="senai-logo" />
        </div>
        <nav>
          <button onClick={() => navigate('/qrcode')}>QR CODE</button>
          <button onClick={() => navigate('/salas')}>SALAS DISPONÍVEIS</button>
          <button onClick={() => navigate('/perfiluser')}>PERFIL</button>
        </nav>
      </header>

      {/* Conteúdo Centralizado (Apenas exibe status) */}
      <main className="main-content">
        <h2>Olá, Usuário!</h2>
      </main>
    </div>
  );
};

export default UserInicial;