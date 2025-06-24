import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './UserInicial.css';

const UserInicial = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    adm1: '',
    email: '',
    telefone: '',
    tipo: ''
  });

  // ID do usuário logado (substitua pelo valor real da sua autenticação)
  const loggedUserId = "1";

  // Busca dados do usuário na API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/adm?id=${loggedUserId}`);
        const data = await response.json();
        
        if (data.length > 0) {
          setUserData(data[0]);
          setFormData(data[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [loggedUserId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // ATUALIZAÇÃO NA API (exemplo)
      const response = await fetch(`http://localhost:4000/adm/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setUserData(formData);
        setEditMode(false);
        alert('Dados atualizados com sucesso!');
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert('Erro ao salvar alterações');
    }
  };

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
      {/* Barra Superior */}
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

      {/* Conteúdo Principal com espaçamento */}
      <main className="profile-main-wrapper">
        {loading ? (
          <div className="loading-message">
            <p>Carregando seus dados...</p>
          </div>
        ) : userData ? (
          <div className="profile-card">
            <div className="profile-header">
              <h2>Meu Perfil</h2>
              {!editMode ? (
                <button 
                  className="edit-button"
                  onClick={() => setEditMode(true)}
                >
                  Editar Perfil
                </button>
              ) : (
                <div className="action-buttons">
                  <button className="save-button" onClick={handleSave}>
                    Salvar
                  </button>
                  <button 
                    className="cancel-button"
                    onClick={() => {
                      setFormData(userData);
                      setEditMode(false);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            {/* Seção Informações Pessoais */}
            <div className="profile-section">
              <h3>Informações Pessoais</h3>
              {editMode ? (
                <div className="form-group">
                  <label>Nome Completo</label>
                  <input
                    type="text"
                    name="adm1"
                    value={formData.adm1}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                  <label>Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              ) : (
                            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Nome:</span>
                <span className="info-value">{userData?.adm1 || 'Não informado'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{userData?.email || 'Não informado'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Telefone:</span>
                <span className="info-value">{userData?.telefone || 'Não informado'}</span>
              </div>
            </div>
              )}
            </div>

            {/* Seção Dados Institucionais */}
            <div className="profile-section">
              <h3>Dados Institucionais</h3>
              <div className="info-item">
                <span className="info-label">Cargo:</span>
                <span className="info-value">{getTipoUsuario(userData.tipo)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="error-message">
            <p>Não foi possível carregar seus dados.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserInicial;