import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './SalasVisaoAdm.css';

const SalasVisaoAdm = () => {
  const navigate = useNavigate();
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await fetch('http://10.90.146.23:7010/api/Salas/LsitarSalas');

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setSalas(data);
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
  }, []);

  // Função para alternar status da sala (apenas simulação local)
  const toggleStatus = async (salaId) => {
    try {
      // Aqui você pode colocar a chamada real para alterar o status na API
      setSalas(salas.map(sala =>
        sala.id === salaId ? { ...sala, disponivel: !sala.disponivel } : sala
      ));
    } catch (error) {
      setError("Falha ao atualizar status da sala");
    }
  };

  // Filtragem e busca
  const filteredSalas = salas.filter(sala => {
    const matchesSearch = sala.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'available' && sala.disponivel) ||
      (filter === 'unavailable' && !sala.disponivel) ||
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
            <button onClick={() => navigate('/adm')}>CADASTRO ADM</button>
            <button onClick={() => navigate('/registros')}>REGISTROS</button>
            <button onClick={() => navigate('/cadastroadm')}>CRIAR USUÁRIO</button>
            <button className="active" onClick={() => navigate('/salasvisaoadm')}>SALAS DISPONÍVEIS</button>
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
      {/* Barra Vermelha Superior */}
      <header className="red-header">
        <div className="logo-container">
          <img src={senaiLogo} alt="Logo SENAI" className="senai-logo" />
        </div>
        <nav>
          <button onClick={() => navigate('/adm')}>CADASTRO ADM</button>
          <button onClick={() => navigate('/registros')}>REGISTROS</button>
          <button onClick={() => navigate('/cadastroadm')}>CRIAR USUÁRIO</button>
          <button className="active" onClick={() => navigate('/salasvisaoadm')}>SALAS DISPONÍVEIS</button>
          <button onClick={() => navigate('/')}>TELA INICIAL</button>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <div className="header-section">
          <h1>SENAI</h1>
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
              <option value="unavailable">Ocupadas</option>
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
                <div className="sala-header">
                  <h3>{sala.nome}</h3>
                  <span className="sala-tipo">{sala.tipo}</span>
                </div>

                <div className="sala-content">
                  <div className="sala-details">
                    <span className="capacity-icon">👥</span>
                    <span>{sala.capacidade} pessoas</span>
                  </div>

                  <div className="sala-actions">
                    <button 
                      className={`status-btn ${sala.disponivel ? 'disponivel' : 'indisponivel'}`}
                      onClick={() => toggleStatus(sala.id)}
                    >
                      {sala.disponivel ? 'Disponível' : 'Ocupada'}
                    </button>

                    <button 
                      className="edit-btn"
                      onClick={() => navigate(`/editar-sala/${sala.id}`)}
                    >
                      Editar
                    </button>
                  </div>
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

export default SalasVisaoAdm;
