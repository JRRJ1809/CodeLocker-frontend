import React from 'react';
import './Registros.css';

const Registros = () => {
  return (
    <div className="registros-container">
      <h1>Registros de Usuários</h1>
      <div className="registro-list">
        <div className="registro-item">
          <span>Marco Aurélio</span>
          <button className="edit-btn">✏️</button>
          <button className="delete-btn">🗑️</button>
        </div>
        <div className="registro-item">
          <span>Marco Aurélio</span>
          <button className="edit-btn">✏️</button>
          <button className="delete-btn">🗑️</button>
        </div>
        {/* Adicione mais usuários conforme necessário */}
      </div>
      <button className="create-user-btn">Criar Usuário</button>
      <p className="admin-label">Administrador</p>
    </div>
  );
};

export default Registros;
