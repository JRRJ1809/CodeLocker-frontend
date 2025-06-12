import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './UserInicial.css';

const UserInicial = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ID do usuário logado (substitua pelo valor real da sua autenticação)
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
  const getTipoUsuario = (tipo) => {
    const tipos = {
      "1": "Administrador",
      "2": "Coordenador",
      "3": "Professor",
      "4": "Equipe de Manutenção",
      "5": "Equipe de Limpeza"
    };
    return tipos[tipo] || "Usuário";
  };

  return (
    <div className="app-container">
      {/* Barra Vermelha Superior (MANTIDO IGUAL) */}
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

      {/* Conteúdo Central - Dados do usuário logado */}
      <main className="main-content">
        {loading ? (
          <p>Carregando seus dados...</p>
        ) : userData ? (
          <div className="user-profile-card">
            <h2>Meu Perfil</h2>
            <div className="profile-field">
              <span className="field-label">Nome:</span>
              <span className="field-value">{userData.adm1}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">Tipo:</span>
              <span className="field-value">{getTipoUsuario(userData.tipo)}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">ID:</span>
              <span className="field-value">{userData.id}</span>
            </div>
          </div>
        ) : (
          <p>Não foi possível carregar seus dados.</p>
        )}
      </main>
    </div>
  );
};

export default UserInicial;