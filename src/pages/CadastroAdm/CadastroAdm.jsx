import React, { useState } from 'react';
import './CadastroAdm.css';

function CadastroAdm() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState('');

  const handleAddAdmin = () => {
    if (newAdmin.trim() !== '') {
      setAdmins([...admins, newAdmin]);
      setNewAdmin('');
    }
  };

  const handleRemoveAdmin = (index) => {
    const updatedAdmins = admins.filter((_, i) => i !== index);
    setAdmins(updatedAdmins);
  };

  return (
    <div className="container">
      <h1 className="title">Gerenciamento de Administradores</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Digite o nome do administrador"
          className="input"
          value={newAdmin}
          onChange={(e) => setNewAdmin(e.target.value)}
        />
        <button className="button" onClick={handleAddAdmin}>
          Adicionar Administrador
        </button>
      </div>
      <ul className="admin-list">
        {admins.map((admin, index) => (
          <li key={index} className="admin-item">
            {admin}
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
