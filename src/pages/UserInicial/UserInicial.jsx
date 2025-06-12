import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './UserInicial.css';

const UserInicial = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulação: ID do usuário logado (substitua pela sua lógica real)
  const loggedUserId = "1"; // Exemplo: ID do SIDRONIO

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/adm?id=${loggedUserId}`);
        const data = await response.json();
        if (data.length > 0) setUserData(data[0]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [loggedUserId]);

  // Função para traduzir o tipo de usuário
  const getUserType = (tipo) => {
    const types = {
      "1": "Administrador",
      "2": "Coordenador",
      "3": "Professor",
      "4": "Manutenção",
      "5": "Limpeza"
    };
    return types[tipo] || "Usuário";
  };

  return (
    <div className="app-container">
      {/* Barra Vermelha Superior (MANTIDO EXATAMENTE COMO ESTÁ) */}
      <header className="red-header">
        <div className="logo-container">
          <img src={senaiLogo} alt="Logo SENAI" className="senai-logo" />
        </div>
        <nav>
          <button onClick={() => navigate('/salas')}>SALAS DISPONÍVEIS</button>
          <button onClick={() => navigate('/userinicial')}>PERFIL</button>
        </nav>
      </header>

      {/* Conteúdo Principal - Adaptado para exibir os dados */}
      <main className="main-content">
        {loading ? (
          <p>Carregando...</p>
        ) : userData ? (
          <>
            <h2>Olá, {userData.adm1}!</h2>
            <div className="profile-card">
              <p><span className="profile-label">ID:</span> {userData.id}</p>
              <p><span className="profile-label">Tipo:</span> {getUserType(userData.tipo)}</p>
              <p><span className="profile-label">Status:</span> <span className="status aberta">Ativo</span></p>
            </div>
          </>
        ) : (
          <p>Não foi possível carregar os dados do usuário.</p>
        )}
      </main>
    </div>
  );
};

export default UserInicial;