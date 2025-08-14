import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './AdmInicial.css';

const AdmInicial = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipo: '1' // 1 = Administrador (fixo)
  });

  // Mock de dados (substitua pela sua API real)
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Simulando chamada à API
        setTimeout(() => {
          setAdminData({
            id: "1",
            nome: "Admin Master",
            email: "admin@senai.br",
            telefone: "(11) 99999-9999",
            tipo: "1"
          });
          setFormData({
            nome: "Admin Master",
            email: "admin@senai.br",
            telefone: "(11) 99999-9999",
            tipo: "1"
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Simulando atualização na API
      setTimeout(() => {
        setAdminData(formData);
        setEditMode(false);
        console.log("Dados atualizados:", formData);
      }, 500);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  return (
    <div className="app-container">
      {/* Barra Superior (igual ao UserInicial, mas com navegação de admin) */}
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

      {/* Conteúdo Principal - IDÊNTICO ao UserInicial */}
      <main className="profile-main-wrapper">
        {loading ? (
          <div className="loading-message">
            <p>Carregando seus dados...</p>
          </div>
        ) : adminData ? (
          <div className="profile-card">
            <div className="profile-header">
              <h2>Perfil Administrativo</h2>
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
                      setFormData(adminData);
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
                    name="nome"
                    value={formData.nome}
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
                    <span className="info-value">{adminData.nome}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{adminData.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Telefone:</span>
                    <span className="info-value">{adminData.telefone || 'Não informado'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Seção Dados Institucionais */}
            <div className="profile-section">
              <h3>Dados Institucionais</h3>
              <div className="info-item">
                <span className="info-label">Cargo:</span>
                <span className="info-value">Administrador</span>
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

export default AdmInicial;