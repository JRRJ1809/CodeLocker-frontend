import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/senai-logo.png';
import Header from '../../components/Header/Header.jsx'; // Importação do Header
import Footer from '../../components/Footer/Footer.jsx';
import './Adm.css';

const urlAdm = 'http://localhost:4000/adm';

const Adm = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');
  const [erro, setErro] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${urlAdm}?adm1=${login}&senha=${senha}`);
      const data = await response.json();

      if (data.length > 0) {
        const usuario = data[0];
        setTipo(usuario.tipo);
        alert('Login bem-sucedido!');
        navigate(usuario.tipo === '1' ? '/AdmInicial' : '/');
      } else {
        setErro('Usuário ou senha inválidos');
      }
    } catch (err) {
      console.error('Erro ao conectar com o servidor:', err);
      setErro('Erro de conexão');
    }
  };

  return (
    <>
      <Header /> {/* Header adicionado aqui */}
      <div className="adm-container">
        <div className="adm-box">
          <div className="login-boxx">
            <img src={logo} alt="Logo SENAI" className="logo" />
            <h2>Login do Administrador</h2>

            <div className="form-group">
              <label>Login</label>
              <input
                type="text"
                placeholder="Usuário do ADM"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
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