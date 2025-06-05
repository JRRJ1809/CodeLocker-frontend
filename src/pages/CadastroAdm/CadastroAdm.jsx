import React, { useState } from 'react';
import './CadastroAdm.css';

function CadastroAdm() {
  const [admins, setAdmins] = useState([]);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  // Função para adicionar o novo administrador
  const handleAddAdmin = async () => {
    if (newAdminName.trim() !== '' && newAdminPassword.trim() !== '') {
      const newAdmin = { nome: newAdminName, senha: newAdminPassword };

      // Simula uma chamada à API para salvar o novo administrador
      try {
        setLoading(true);
        const response = await fetch('http://localhost:4000/adm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAdmin),
        });

        if (response.ok) {
          // Sucesso! Atualiza a lista de administradores com o novo admin
          const savedAdmin = await response.json();
          setAdmins([...admins, savedAdmin]);
          setNewAdminName('');
          setNewAdminPassword('');
          setErro('');
        } else {
          throw new Error('Falha ao adicionar administrador');
        }
      } catch (error) {
        setErro('Erro ao conectar com a API');
      } finally {
        setLoading(false);
      }
    } else {
      setErro('Preencha o nome e a senha');
    }
  };

  // Função para remover um administrador
  const handleRemoveAdmin = async (index) => {
    const adminToDelete = admins[index];

    try {
      const response = await fetch(`http://localhost:4000/adm/${adminToDelete.nome}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedAdmins = admins.filter((_, i) => i !== index);
        setAdmins(updatedAdmins);
      } else {
        throw new Error('Falha ao excluir administrador');
      }
    } catch (error) {
      setErro('Erro ao tentar excluir administrador');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Gerenciamento de Administradores</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Digite o nome do administrador"
          className="input"
          value={newAdminName}
          onChange={(e) => setNewAdminName(e.target.value)}
        />
      </div>

      <div className="form">
        <input
          type="password"
          placeholder="Digite uma senha para o administrador"
          className="input"
          value={newAdminPassword}
          onChange={(e) => setNewAdminPassword(e.target.value)}
        />
      </div>

      <button className="button" onClick={handleAddAdmin} disabled={loading}>
        {loading ? 'Adicionando...' : 'Adicionar Administrador'}
      </button>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <ul className="admin-list">
        {admins.map((admin, index) => (
          <li key={index} className="admin-item">
            {admin.nome}
            <button className="delete-button" onClick={() => handleRemoveAdmin(index)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CadastroAdm;
