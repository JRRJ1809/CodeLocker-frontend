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
    tipo: '1',
    qrcode: ''
  });

  // 🔹 Buscar dados do admin do localStorage
  useEffect(() => {
    const fetchAdminData = () => {
      const id = localStorage.getItem('usuarioId');
      const nome = localStorage.getItem('usuarioNome');
      const email = localStorage.getItem('usuarioEmail');
      const telefone = localStorage.getItem('usuarioTelefone');
      const tipo = localStorage.getItem('usuarioTipo');
      const qrcode = localStorage.getItem('usuarioQRCode');

      if (!id) {
        setLoading(false);
        return;
      }

      const data = { id, nome, email, telefone, tipo, qrcode };
      setAdminData(data);
      setFormData(data);
      setLoading(false);
    };

    fetchAdminData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://10.90.154.27:7010/api/Usuarios/${adminData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao atualizar dados");

      setAdminData(formData);
      setEditMode(false);
      alert("Perfil atualizado com sucesso!");

      // Atualizar localStorage
      localStorage.setItem('usuarioNome', formData.nome);
      localStorage.setItem('usuarioEmail', formData.email);
      localStorage.setItem('usuarioTelefone', formData.telefone);

    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao salvar alterações");
    }
  };

  return (
    <div className="app-container">
      <header className="red-header">
        <div className="logo-container">
          <img src={senaiLogo} alt="Logo SENAI" className="senai-logo" />
        </div>
        <nav>
          <button onClick={() => navigate('/adm')}>CADASTRO ADM</button>
          <button onClick={() => navigate('/cadastroadm')}>CRIAR USUÁRIO</button>
          <button onClick={() => navigate('/salasvisaoadm')}>SALAS DISPONÍVEIS</button>
          <button onClick={() => navigate('/adminicial')}>PERFIL</button>
          <button onClick={() => navigate('/')}>TELA INICIAL</button>
        </nav>
      </header>

      <main className="profile-main-wrapper">
        {loading ? (
          <p>Carregando seus dados...</p>
        ) : adminData ? (
          <div className="profile-card">
            <div className="profile-header">
              <h2>Perfil Administrativo</h2>
              {editMode ? (
                <div className="action-buttons">
                  <button className="save-button" onClick={handleSave}>Salvar</button>
                  <button className="cancel-button" onClick={() => { setFormData(adminData); setEditMode(false); }} >
                    Cancelar
                  </button>
                </div>
              ) : null}
            </div>

            <div className="profile-section">
              <h3>Informações Pessoais</h3>
              {editMode ? (
                <div className="form-group">
                  <label>Nome Completo</label>
                  <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} className="form-input" />
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" />
                  <label>Telefone</label>
                  <input type="tel" name="telefone" value={formData.telefone} onChange={handleInputChange} className="form-input" />
                  <label>QR Code</label>
                  <input type="text" value={adminData.qrcode || ""} readOnly className="form-input" />
                </div>
              ) : (
                <div className="info-grid">
                  <div className="info-item"><span className="info-label">Nome:</span><span className="info-value">{adminData.nome}</span></div>
                  <div className="info-item"><span className="info-label">Email:</span><span className="info-value">{adminData.email}</span></div>
                  <div className="info-item"><span className="info-label">Telefone:</span><span className="info-value">{adminData.telefone || "Não informado"}</span></div>
                  <div className="info-item"><span className="info-label">Código de Acesso:</span><span className="info-value">{adminData.qrcode || "Não disponível"}</span></div>
                </div>
              )}
            </div>

            <div className="profile-section">
              <h3>Dados Institucionais</h3>
              <div className="info-item">
                <span className="info-label">Cargo:</span>
                <span className="info-value">Administrador</span>
              </div>
            </div>
          </div>
        ) : (
          <p>Não foi possível carregar seus dados. Faça login novamente.</p>
        )}
      </main>
    </div>
  );
};

export default AdmInicial;
