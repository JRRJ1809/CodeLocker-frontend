import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate do React Router
import logo from '../../assets/senai-logo.png';
import './Adm.css';

const urlAdm = 'http://localhost:4000/adm';

const Adm = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');
  const [erro, setErro] = useState('');

  const navigate = useNavigate();  // Definir o hook de navegação

  const handleLogin = async () => {
    try {
      // Modificado para fazer o filtro correto
      const response = await fetch(`${urlAdm}?adm1=${login}&senha=${senha}`);
      const data = await response.json();

      if (data.length > 0) {
        const usuario = data[0];  // Supondo que a resposta seja um array com um único item

        setTipo(usuario.tipo);  // Definindo o tipo do usuário
        alert('Login bem-sucedido!');

        // Redirecionar o usuário para a próxima página após o login
        if (usuario.tipo === '1') {
          // Se for tipo 1, vai para a página de admin
          navigate('/admin-dashboard');  // Aqui, coloque a rota para onde você quer redirecionar
        } else {
          // Para outros tipos de usuários, redireciona para outra página, se necessário
          navigate('/user-dashboard');  // Exemplo de outra rota
        }
      } else {
        setErro('Usuário ou senha inválidos');
      }
    } catch (err) {
      console.error('Erro ao conectar com o servidor:', err);
      setErro('Erro de conexão');
    }
  };

  return (
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
  );
};

export default Adm;
