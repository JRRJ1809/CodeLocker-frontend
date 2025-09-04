import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './UserInicial.css';

const UserInicial = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipo: '',
    qrcode: ''
  });

  useEffect(() => {
    // Carregar dados do localStorage (salvos no login)
    const usuarioId = localStorage.getItem('usuarioId');
    const usuarioNome = localStorage.getItem('usuarioNome');
    const usuarioEmail = localStorage.getItem('usuarioEmail');
    const usuarioTelefone = localStorage.getItem('usuarioTelefone');
    const usuarioTipo = localStorage.getItem('usuarioTipo');
    const usuarioQRCode = localStorage.getItem('usuarioQRCode');

    if (usuarioId && usuarioNome) {
      const usuario = {
        id: usuarioId,
        nome: usuarioNome,
        email: usuarioEmail,
        telefone: usuarioTelefone,
        tipo: usuarioTipo,
        qrcode: usuarioQRCode
      };
      setUserData(usuario);
      setFormData(usuario);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://10.90.154.27:7010/api/Usuarios/${userData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao atualizar dados");

      localStorage.setItem('usuarioNome', formData.nome);
      localStorage.setItem('usuarioEmail', formData.email);
      localStorage.setItem('usuarioTelefone', formData.telefone);

      setUserData(formData);
      setEditMode(false);
      alert("Dados atualizados com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar alterações");
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

      <main className="profile-main-wrapper">
        {userData ? (
          <div className="profile-card">
            <div className="profile-header">
              <h2>Meu Perfil</h2>
              {editMode ? (
                <div className="action-buttons">
                  <button className="save-button" onClick={handleSave}>Salvar</button>
                  <button className="cancel-button" onClick={() => { setFormData(userData); setEditMode(false); }}>Cancelar</button>
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
                  <input type="text" value={userData.qrcode || ""} readOnly className="form-input" />
                </div>
              ) : (
                <div className="info-grid">
                  <div className="info-item"><span className="info-label">Nome:</span><span className="info-value">{userData.nome}</span></div>
                  <div className="info-item"><span className="info-label">Email:</span><span className="info-value">{userData.email}</span></div>
                  <div className="info-item"><span className="info-label">Telefone:</span><span className="info-value">{userData.telefone || "Não informado"}</span></div>
                  <div className="info-item"><span className="info-label">Código de Acesso:</span><span className="info-value">{userData.qrcode || "Não disponível"}</span></div>
                </div>
              )}
            </div>

            <div className="profile-section">
              <h3>Dados Institucionais</h3>
              <div className="info-item">
                <span className="info-label">Cargo:</span>
                <span className="info-value">{getTipoUsuario(userData.tipo)}</span>
              </div>
            </div>
          </div>
        ) : (
          <p>Nenhum dado encontrado. Faça login novamente.</p>
        )}
      </main>
    </div>
  );
};

export default UserInicial;
