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

  // Carrega todas as salas
  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await fetch('http://10.90.154.27:7010/api/Salas/LsitarSalas');
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          const salasComStatus = data.map(s => ({
            ...s,
            disponivel: s.status_salas === 1
          }));
          setSalas(salasComStatus);
        } else {
          setError('Resposta inesperada da API');
        }
      } catch (err) {
        console.error(err);
        setError("Falha ao carregar salas. Tente recarregar a página.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalas();
  }, []);

  // Atualiza status da sala
  const toggleStatus = async (sala) => {
    const novoStatus = sala.status_salas === 1 ? 2 : 1;

    try {
      const response = await fetch(
        `http://10.90.154.27:7010/api/Salas/EditarStatus/${sala.id}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'accept': '*/*'
          },
          body: JSON.stringify(novoStatus)
        }
      );

      // ✅ Trata status de sucesso mesmo sem corpo
      if (response.status === 200 || response.status === 204) {
        setSalas(prev =>
          prev.map(s =>
            s.id === sala.id
              ? { ...s, status_salas: novoStatus, disponivel: novoStatus === 1 }
              : s
          )
        );
      } else {
        throw new Error(`Erro ao atualizar status: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
      setError("Falha ao atualizar status da sala");
      setTimeout(() => setError(null), 3000);
    }
  };

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

  if (loading) return <div className="app-container"><div className="loading-spinner"></div></div>;

  return (
    <div className="app-container">
      <header className="red-header">
        <div className="logo-container"><img src={senaiLogo} alt="Logo SENAI" className="senai-logo" /></div>
        <nav>
          <button onClick={() => navigate('/adm')}>CADASTRO ADM</button>
          <button onClick={() => navigate('/cadastroadm')}>CRIAR USUÁRIO</button>
          <button className="active" onClick={() => navigate('/salasvisaoadm')}>SALAS DISPONÍVEIS</button>
          <button onClick={() => navigate('/adminicial')}>PERFIL</button>
          <button onClick={() => navigate('/')}>TELA INICIAL</button>
        </nav>
      </header>

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
            </select>
          </div>
        </div>

        <div className="salas-grid">
          {filteredSalas.length > 0 ? filteredSalas.map(sala => (
            <div key={sala.id} className={`sala-card ${sala.disponivel ? 'disponivel' : 'indisponivel'}`}>
              <div className="sala-header">
                <h3>{sala.nome}</h3>
                <span className="sala-tipo">{sala.tipo}</span>
              </div>
              <div className="sala-content">
                
                <div className="sala-actions">
                  <button 
                    className={`status-btn ${sala.disponivel ? 'disponivel' : 'indisponivel'}`}
                    onClick={() => toggleStatus(sala)}
                  >
                    {sala.disponivel ? 'Marcar como Ocupada' : 'Marcar como Disponível'}
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="no-results">Nenhuma sala encontrada com os filtros selecionados</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SalasVisaoAdm;
