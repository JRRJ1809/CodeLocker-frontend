import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './Salas.css';

const Salas = () => {
  const navigate = useNavigate();
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Simulando chamada à API - Substitua pelo seu fetch real
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        // Aqui você fará a chamada real para sua API
        // const response = await fetch('sua-api/salas');
        // const data = await response.json();
        
        // Dados mockados temporários
        const data = [
          { id: 1, nome: 'Sala 101', capacidade: 20, disponivel: true, tipo: 'Sala de Aula' },
          { id: 2, nome: 'Laboratório de TI', capacidade: 15, disponivel: false, tipo: 'Laboratório' },
          { id: 3, nome: 'Sala 202', capacidade: 25, disponivel: true, tipo: 'Sala de Aula' },
          { id: 4, nome: 'Auditório', capacidade: 50, disponivel: true, tipo: 'Auditório' }
        ];
        
        setSalas(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar salas:", error);
        setLoading(false);
      }
    };

    fetchSalas();
  }, []);

  // Filtragem e busca
  const filteredSalas = salas.filter(sala => {
    const matchesSearch = sala.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'available' && sala.disponivel) ||
      (filter === 'classroom' && sala.tipo === 'Sala de Aula') ||
      (filter === 'lab' && sala.tipo === 'Laboratório');
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="app-container">
        <header className="red-header">
          <div className="logo-container">
            <img src={senaiLogo} alt="Logo SENAI" className="senai-logo" />
          </div>
          <nav>
            <button onClick={() => navigate("/")}>CADASTRO</button>
            <button className="active" onClick={() => navigate('/salas')}>SALAS DISPONÍVEIS</button>
            <button onClick={() => navigate('/userinicial')}>PERFIL</button>
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
      {/* Barra Vermelha Superior */}
      <header className="red-header">
        <div className="logo-container">
          <img src={senaiLogo} alt="Logo SENAI" className="senai-logo" />
        </div>
        <nav>
          <button onClick={() => navigate("/")}>CADASTRO</button>
          <button className="active" onClick={() => navigate('/salas')}>SALAS DISPONÍVEIS</button>
          <button onClick={() => navigate('/userinicial')}>PERFIL</button>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <div className="header-section">
          <h2>SALAS DISPONÍVEIS</h2>
          <div className="search-filter">
            <input 
              type="text" 
              placeholder="Buscar sala..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Todas as salas</option>
              <option value="available">Disponíveis</option>
              <option value="classroom">Salas de aula</option>
              <option value="lab">Laboratórios</option>
            </select>
          </div>
        </div>
        
        <div className="salas-grid">
          {filteredSalas.length > 0 ? (
            filteredSalas.map((sala) => (
              <div 
                key={sala.id} 
                className={`sala-card ${sala.disponivel ? 'disponivel' : 'indisponivel'}`}
              >
                <div className="sala-tipo">{sala.tipo}</div>
                <div className="sala-content">
                  <h3>{sala.nome}</h3>
                  <div className="sala-details">
                    <span className="capacity-icon">👥</span>
                    <span>{sala.capacidade} pessoas</span>
                  </div>
                </div>
                <div className="sala-status">
                  <span className="status-dot"></span>
                  <span>{sala.disponivel ? 'Disponível' : 'Ocupada'}</span>
                </div>
                <button className="reserva-btn">
                  {sala.disponivel ? 'Reservar' : 'Detalhes'}
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">
              Nenhuma sala encontrada com os filtros selecionados
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Salas;