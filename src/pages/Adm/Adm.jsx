import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/senai-logo.png';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import userIcon from '../../assets/user-icon.png';
import passwordIcon from '../../assets/password-icon.png';
import './Adm.css';

const API_URL = 'http://10.90.154.27:7010/api/Usuarios/Login';

const Adm = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: login,
          senha: senha,
        }),
      });

      const data = await response.json();

      if (response.ok && data.usuario) {
        const { id, nome, email, telefone, tipo } = data.usuario;

        // Salvar no localStorage para usar no AdmInicial
        localStorage.setItem('usuarioId', data.usuario.id);
        localStorage.setItem('usuarioNome', data.usuario.nome);
        localStorage.setItem('usuarioEmail', data.usuario.email);
        localStorage.setItem('usuarioTelefone', data.usuario.telefone);
        localStorage.setItem('usuarioTipo', data.usuario.tipo);
        localStorage.setItem('usuarioQRCode', data.usuario.qrcode); // ✅ salvar QR Code

        // Removido o alert aqui

        // Redireciona para a tela correta
        navigate(tipo === 1 ? '/AdmInicial' : '/');
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
      <div className="adm-container">
        <div className="adm-box">
          <div className="login-boxx">
            <img src={logo} alt="Logo SENAI" className="logo" />
            <h2>Login do Administrador</h2>

            <div className="form-group">
              <label>
                <img src={userIcon} alt="Ícone Usuário" className="icon" />
                Login
              </label>
              <input
                type="text"
                placeholder="Usuário do ADM"
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
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <button className="btn" onClick={handleLogin}>Entrar</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Adm;
