import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/senai-logo.png';
import userIcon from '../../assets/user-icon.png';
import passwordIcon from '../../assets/password-icon.png';
import adminIcon from '../../assets/admin-icon.png';
import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header.jsx';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:4000/adm?adm1=${login}&senha=${senha}`);
      const data = await response.json();

      if (data.length > 0) {
        // Login correto
        alert('Login bem-sucedido!');
        navigate('/userinicial'); // redireciona para a página desejada
      } else {
        setErro('Usuário ou senha inválidos');
      }
    } catch (err) {
      console.error('Erro ao conectar com o servidor:', err);
      setErro('Erro de conexão com o servidor');
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-box">
          <img src={logo} alt="Logo SENAI" className="logo" />
          <h2>Login Usuário</h2>

          <div className="form-group">
            <label>
              <img src={userIcon} alt="Ícone Usuário" className="icon" />
              Login
            </label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              autoComplete="off"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              <img src={passwordIcon} alt="Ícone Senha" className="icon" />
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              autoComplete="new-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && <p style={{ color: 'red' }}>{erro}</p>}

          <button className="btn" onClick={handleLogin}>Entrar</button>
          <button className="btn admin" onClick={() => navigate('/adm')}>
            <img src={adminIcon} alt="Ícone Administrador" className="icon" />
            Administrador
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
