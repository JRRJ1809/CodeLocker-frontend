import React from 'react';
import logo from '../../assets/senai-logo.png';
import './Adm.css';

const Adm = () => {
  return (
    <div className="adm-container">
      <div className="adm-box">
        <div className="login-boxx">
                <img src={logo} alt="Logo SENAI" className="logo" />
        <h2>Login do Administrador</h2>

        <div className="form-group">
          <label>Login</label>
          <input type="text" placeholder="Usuário do ADM" />
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input type="password" placeholder="Senha" />
        </div>

        <button className="btn">Entrar</button>
      </div>
    </div>
    </div>
  );
};

export default Adm;
