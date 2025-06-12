import React from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './Salas.css';

const Salas = () => {
  const navigate = useNavigate();

  // Dados mockados das salas (substitua pela sua API)
  const salas = [
    { nome: 'Sala 101', capacidade: 20, disponivel: true },
    { nome: 'Laboratório de TI', capacidade: 15, disponivel: false },
    { nome: 'Sala 202', capacidade: 25, disponivel: true },
    { nome: 'Auditório', capacidade: 50, disponivel: true }
  ];

  return (
    <div className="app-container">
      {/* Barra Vermelha Superior */}
      <header className="red-header">
        <div className="logo-container">
          <img src={senaiLogo} alt="Logo SENAI" className="senai-logo" />
        </div>
        <nav>
          <button onClick={() => navigate("/")}>CADASTRO</button>
          <button onClick={() => navigate('/salas')}>SALAS DISPONÍVEIS</button>
          <button onClick={() => navigate('/userinicial')}>PERFIL</button>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <h1>SENAI</h1>
        <h2>SALAS DISPONÍVEIS</h2>
        
        <div className="salas-list">
          {salas.map((sala, index) => (
            <div 
              key={index} 
              className={`sala-item ${sala.disponivel ? 'disponivel' : 'indisponivel'}`}
            >
              <div className="sala-info">
                <h3>{sala.nome}</h3>
                <p>Capacidade: {sala.capacidade} pessoas</p>
              </div>
              <div className="sala-status">
                {sala.disponivel ? 'Disponível' : 'Ocupada'}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Salas;