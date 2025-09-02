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
  const [error, setError] = useState(null);

  // CHAMADA REAL DA API (igual você fez no Admin)
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await fetch('http://10.90.132.4:7010/api/Salas/LsitarSalas');
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          // Adiciona o campo "disponivel" com base no "status_salas"
          const salasComStatus = data.map(sala => ({
            ...sala,
            disponivel: sala.status_salas === 1 // 1 = Disponível, 2 = Indisponível
          }));

          setSalas(salasComStatus);
        } else {
          setError('Resposta inesperada da API');
        }
      } catch (error) {
        console.error("Erro ao carregar salas:", error);
        setError("Falha ao carregar salas. Tente recarregar a página.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalas();
  }, []); // Chama a função ao carregar o componente

  // Filtragem e busca (mantida igual)
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
          
          {error && <div className="error-message">{error}</div>}
          
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
