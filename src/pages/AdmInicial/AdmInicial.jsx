import React from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './AdmInicial.css';


const AdmInicial = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="app-container">
      {/* Barra Vermelha Superior com Logo */}
      <header className="red-header">
        <div className="logo-container">
          <img src={senaiLogo} alt="Logo SENAI" className="senai-logo" />
        </div>
        <nav className="nav-buttons">
          <button onClick={() => navigate('/cadastro')}>CADASTRO</button>
          <button onClick={() => navigate('/qrcode')}>QR CODE</button>
          <button onClick={() => navigate('/registros')}>REGISTROS</button>
          <button onClick={() => navigate('/cadastro-adm')}>CADASTRO ADM</button>
          <button onClick={() => navigate('/salas')}>SALAS DISPONÍVEIS</button>
          <button onClick={() => navigate('/admin')}>ADMIN</button>
        </nav>
      </header>

      {/* Conteúdo Centralizado */}
      <main className="main-content">
        <h2>Olá, Administrador!</h2>
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Usuários Ativos</h3>
            <p className="stat-value">24</p>
          </div>
          <div className="stat-card">
            <h3>Salas Ocupadas</h3>
            <p className="stat-value">5/10</p>
          </div>
          <div className="stat-card">
            <h3>Acessos Hoje</h3>
            <p className="stat-value">42</p>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default AdmInicial;
