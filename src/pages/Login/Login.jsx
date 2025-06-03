import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/senai-logo.png';
import userIcon from '../../assets/user-icon.png';
import passwordIcon from '../../assets/password-icon.png';
import adminIcon from '../../assets/admin-icon.png';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo SENAI" className="logo" />
        <h2>Login Usuário</h2>
        <div className="form-group">
          <label>
            <img src={userIcon} alt="Ícone Usuário" className="icon" />
            Login
          </label>
          <input type="text" placeholder="Digite seu usuário" autocomplete="off" />
        </div>
        <div className="form-group">
          <label>
            <img src={passwordIcon} alt="Ícone Senha" className="icon" />
            Senha
          </label>
          <input type="password" placeholder="Digite sua senha" autocomplete="new-password" />

        </div>
        <button className="btn">Entrar</button>
        <button className="btn admin" onClick={() => navigate('/adm')}>
          <img src={adminIcon} alt="Ícone Administrador" className="icon" />
          Administrador
        </button>
      </div>
    </div>
  );
};

export default Login;

