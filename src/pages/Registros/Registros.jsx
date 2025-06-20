import React from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './Registros.css';

const Registros = () => {
  const navigate = useNavigate();

  // Dados mockados dos registros (substitua pela sua API)
  const registros = [
    { hora: '07:32', nome: 'Marco Aurélio', acao: 'Entrada', sala: 'Sala B12' },
    { hora: '07:32', nome: 'Marco Aurélio', acao: 'Entrada', sala: 'Sala B12' },
    { hora: '07:32', nome: 'Marco Aurélio', acao: 'Entrada', sala: 'Sala B12' },
    { hora: '07:32', nome: 'Marco Aurélio', acao: 'Entrada', sala: 'Sala B12' },
    { hora: '07:32', nome: 'Marco Aurélio', acao: 'Entrada', sala: 'Sala B12' }
  ];

  return (
    <div className="app-container">
      {/* Barra Vermelha Superior */}
      <header className="red-header">
        <div className="logo-container">
          <img src={senaiLogo} alt="Logo SENAI" className="senai-logo" />
        </div>
        <nav>
          <button onClick={() => navigate('/adm')}>CADASTRO ADM</button>
          <button onClick={() => navigate('/registros')}>REGISTROS</button>
          <button onClick={() => navigate('/cadastroadm')}>CRIAR USUÁRIO</button>
          <button onClick={() => navigate('/salasvisaoadm')}>SALAS DISPONÍVEIS</button>
          <button onClick={() => navigate('/')}>TELA INICIAL</button>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <h1>SENAI</h1>
        <h2>REGISTROS</h2>
        
        <div className="registros-table">
          {registros.map((registro, index) => (
            <div key={index} className="registro-item">
              <span className="registro-hora">{registro.hora}</span>
              <span className="registro-detalhes">
                {registro.nome} - {registro.acao} - {registro.sala}
              </span>
            </div>
          ))}
        </div>

        <div className="admin-label">
          ADMINISTRADOR
        </div>
      </main>
    </div>
  );
};

export default Registros;