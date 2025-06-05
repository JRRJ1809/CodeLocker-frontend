import React, { useEffect, useState } from 'react';
import './CadastroAdm.css';

function CadastroAdm() {
  const [admins, setAdmins] = useState([]);
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminType, setNewAdminType] = useState('');
  const [tipos, setTipos] = useState([]); // Tipos de usuário vindos da API
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  // Carregar tipos da API
  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await fetch('http://localhost:4000/tipos');
        const data = await response.json();
        setTipos(data);

        if (data.length > 0) {
          setNewAdminType(data[0].id.toString()); // Seleciona o primeiro tipo como padrão
        }
      } catch (error) {
        setErro('Erro ao carregar tipos de usuário');
      }
    };

    fetchTipos();
  }, []);

  const handleAddAdmin = async () => {
    if (newAdminName.trim() && newAdminPassword.trim() && newAdminType) {
      const newAdmin = {
        adm1: newAdminName,
        senha: newAdminPassword,
        tipo: newAdminType
      };

      try {
        setLoading(true);
        const response = await fetch('http://localhost:4000/adm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAdmin),
        });

        if (response.ok) {
          const savedAdmin = await response.json();
          setAdmins([...admins, savedAdmin]);
          setNewAdminName('');
          setNewAdminPassword('');
          setErro('');
        } else {
          throw new Error('Erro ao salvar o administrador');
        }
      } catch (error) {
        setErro('Erro ao conectar com a API');
      } finally {
        setLoading(false);
      }
    } else {
      setErro('Preencha todos os campos');
    }
  };

  const handleRemoveAdmin = async (index) => {
    const adminToDelete = admins[index];

    try {
      const response = await fetch(`http://localhost:4000/adm/${adminToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedAdmins = admins.filter((_, i) => i !== index);
        setAdmins(updatedAdmins);
      } else {
        throw new Error('Erro ao excluir usuário');
      }
    } catch (error) {
      setErro('Erro ao tentar excluir usuário');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Gerenciamento de Usuários</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          className="input"
          value={newAdminName}
          onChange={(e) => setNewAdminName(e.target.value)}
        />
      </div>

      <div className="form">
        <input
          type="password"
          placeholder="Digite uma senha para o usuário"
          className="input"
          value={newAdminPassword}
          onChange={(e) => setNewAdminPassword(e.target.value)}
        />
      </div>

      <div className="form">
        <label>Tipo de Usuário</label>
        <select
          className="input"
          value={newAdminType}
          onChange={(e) => setNewAdminType(e.target.value)}
        >
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.tipo}
            </option>
          ))}
        </select>
      </div>

      <button className="button" onClick={handleAddAdmin} disabled={loading}>
        {loading ? 'Adicionando...' : 'Adicionar Usuário'}
      </button>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <ul className="admin-list">
        {admins.map((admin, index) => {
          const tipoNome = tipos.find(t => t.id.toString() === admin.tipo)?.tipo || 'Desconhecido';
          return (
            <li key={index} className="admin-item">
              {admin.adm1} (Tipo: {tipoNome})
              <button className="delete-button" onClick={() => handleRemoveAdmin(index)}>
                Excluir
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CadastroAdm;
