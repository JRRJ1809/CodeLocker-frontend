import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './Registros.css';

const Registros = () => {
  const navigate = useNavigate();
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos');
  const [busca, setBusca] = useState('');

  // Simulação de API - substitua pelo seu endpoint real
  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        // Substitua por: const response = await fetch('sua-api/registros');
        // const data = await response.json();
        
        // Dados mockados melhorados
        const data = [
          { id: 1, hora: '07:32', nome: 'Marco Aurélio', acao: 'Entrada', sala: 'Sala B12', data: '2023-11-20' },
          { id: 2, hora: '08:15', nome: 'Ana Silva', acao: 'Saída', sala: 'Laboratório TI', data: '2023-11-20' },
          { id: 3, hora: '09:45', nome: 'Carlos Oliveira', acao: 'Entrada', sala: 'Auditório', data: '2023-11-20' },
          { id: 4, hora: '10:20', nome: 'Marco Aurélio', acao: 'Saída', sala: 'Sala B12', data: '2023-11-20' },
          { id: 5, hora: '13:00', nome: 'Fernanda Costa', acao: 'Entrada', sala: 'Sala A10', data: '2023-11-20' }
        ];
        
        setRegistros(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar registros:", error);
        setLoading(false);
      }
    };

    fetchRegistros();
  }, []);

  // Filtra os registros
  const registrosFiltrados = registros.filter(registro => {
    const matchesBusca = 
      registro.nome.toLowerCase().includes(busca.toLowerCase()) ||
      registro.sala.toLowerCase().includes(busca.toLowerCase());
    
    const matchesFiltro = 
      filtro === 'todos' ||
      (filtro === 'entradas' && registro.acao === 'Entrada') ||
      (filtro === 'saidas' && registro.acao === 'Saída');
    
    return matchesBusca && matchesFiltro;
  });

  if (loading) {
    return (
      <div className="app-container">
        <header className="red-header">
          <div className="logo-container">
            <img src={senaiLogo} alt="Logo SENAI" className="senai-logo" />
          </div>
          <nav>
            <button onClick={() => navigate('/adm')}>CADASTRO ADM</button>
            <button className="active" onClick={() => navigate('/registros')}>REGISTROS</button>
            <button onClick={() => navigate('/cadastroadm')}>CRIAR USUÁRIO</button>
            <button onClick={() => navigate('/salasvisaoadm')}>SALAS DISPONÍVEIS</button>
            <button onClick={() => navigate('/')}>TELA INICIAL</button>
          </nav>
        </header>
        <main className="main-content">
          <div className="loading-spinner"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="red-header">
        <div className="logo-container">
          <img src={senaiLogo} alt="Logo SENAI" className="senai-logo" />
        </div>
        <nav>
          <button onClick={() => navigate('/adm')}>CADASTRO ADM</button>
          <button className="active" onClick={() => navigate('/registros')}>REGISTROS</button>
          <button onClick={() => navigate('/cadastroadm')}>CRIAR USUÁRIO</button>
          <button onClick={() => navigate('/salasvisaoadm')}>SALAS DISPONÍVEIS</button>
          <button onClick={() => navigate('/')}>TELA INICIAL</button>
        </nav>
      </header>

      <main className="main-content">
        <div className="header-section">
          <h1>SENAI</h1>
          <h2>REGISTROS</h2>
          
          <div className="filtros-container">
            <input
              type="text"
              placeholder="Buscar por nome ou sala..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="search-input"
            />
            
            <div className="filtros-group">
              <button 
                className={`filtro-btn ${filtro === 'todos' ? 'active' : ''}`}
                onClick={() => setFiltro('todos')}
              >
                Todos
              </button>
              <button 
                className={`filtro-btn ${filtro === 'entradas' ? 'active' : ''}`}
                onClick={() => setFiltro('entradas')}
              >
                Entradas
              </button>
              <button 
                className={`filtro-btn ${filtro === 'saidas' ? 'active' : ''}`}
                onClick={() => setFiltro('saidas')}
              >
                Saídas
              </button>
            </div>
          </div>
        </div>
        
        <div className="registros-container">
          {registrosFiltrados.length > 0 ? (
            <table className="registros-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Nome</th>
                  <th>Ação</th>
                  <th>Sala</th>
                </tr>
              </thead>
              <tbody>
                {registrosFiltrados.map((registro) => (
                  <tr key={registro.id} className="registro-item">
                    <td>{registro.data}</td>
                    <td className="registro-hora">{registro.hora}</td>
                    <td>{registro.nome}</td>
                    <td>
                      <span className={`acao-badge ${registro.acao === 'Entrada' ? 'entrada' : 'saida'}`}>
                        {registro.acao}
                      </span>
                    </td>
                    <td>{registro.sala}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              Nenhum registro encontrado com os filtros selecionados
            </div>
          )}
        </div>

        <div className="admin-actions">
          <button className="export-btn">
            Exportar para Excel
          </button>
          <span className="admin-label">
            ADMINISTRADOR
          </span>
        </div>
      </main>
    </div>
  );
};

export default Registros;