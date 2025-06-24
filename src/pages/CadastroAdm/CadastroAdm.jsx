import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './CadastroAdm.css';

const CadastroAdm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    tipo: ''
  });
  const [tiposUsuario, setTiposUsuario] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState({
    tipos: true,
    cadastro: false,
    lista: true
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  // Busca tipos de usuário
  useEffect(() => {
    const fetchTiposUsuario = async () => {
      try {
        // Substitua pela sua API real
        // const response = await fetch('http://sua-api/tipos-usuario');
        // const data = await response.json();
        
        // Mock de dados
        const data = [
          { id: 1, nome: 'Administrador' },
          { id: 2, nome: 'Professor' },
          { id: 3, nome: 'Funcionário' }
        ];
        
        setTiposUsuario(data);
        setFormData(prev => ({ ...prev, tipo: data[0]?.id.toString() || '' }));
        setLoading(prev => ({ ...prev, tipos: false }));
      } catch (error) {
        setErro('Erro ao carregar tipos de usuário');
        setLoading(prev => ({ ...prev, tipos: false }));
      }
    };

    fetchTiposUsuario();
  }, []);

  // Busca usuários cadastrados
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Substitua pela sua API real
        // const response = await fetch('http://sua-api/usuarios');
        // const data = await response.json();
        
        // Mock de dados
        const data = [
          { id: 1, nome: 'Admin Master', email: 'master@senai.com', telefone: '(11) 9999-9999', tipo: 1 },
          { id: 2, nome: 'Professor João', email: 'joao@senai.com', telefone: '(11) 8888-8888', tipo: 2 }
        ];
        
        setUsuarios(data);
        setLoading(prev => ({ ...prev, lista: false }));
      } catch (error) {
        setErro('Erro ao carregar lista de usuários');
        setLoading(prev => ({ ...prev, lista: false }));
      }
    };

    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    // Validação básica
    if (!formData.nome || !formData.email || !formData.senha || !formData.tipo) {
      setErro('Preencha todos os campos obrigatórios');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErro('E-mail inválido');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, cadastro: true }));
      
      // Substitua pela chamada real à sua API
      // const response = await fetch('http://sua-api/usuarios', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulação de resposta da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      const novoUsuario = {
        id: usuarios.length + 1,
        ...formData,
        tipo: parseInt(formData.tipo)
      };
      
      setUsuarios(prev => [...prev, novoUsuario]);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        senha: '',
        tipo: tiposUsuario[0]?.id.toString() || ''
      });
      setSucesso('Usuário cadastrado com sucesso!');
    } catch (error) {
      setErro('Erro ao cadastrar usuário. Tente novamente.');
    } finally {
      setLoading(prev => ({ ...prev, cadastro: false }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;
    
    try {
      // Substitua pela chamada real à sua API
      // await fetch(`http://sua-api/usuarios/${id}`, { method: 'DELETE' });
      
      setUsuarios(prev => prev.filter(user => user.id !== id));
      setSucesso('Usuário excluído com sucesso!');
    } catch (error) {
      setErro('Erro ao excluir usuário');
    }
  };

  return (
    <div className="cadastro-adm-container">
      {/* Cabeçalho Fixo */}
      <header className="red-header">
        <div className="logo-container">
          <img src={senaiLogo} alt="Logo SENAI" className="senai-logo" />
        </div>
        <nav>
          <button onClick={() => navigate('/adm')}>CADASTRO ADM</button>
          <button onClick={() => navigate('/registros')}>REGISTROS</button>
          <button className="active" onClick={() => navigate('/cadastroadm')}>CRIAR USUÁRIO</button>
          <button onClick={() => navigate('/salasvisaoadm')}>SALAS DISPONÍVEIS</button>
          <button onClick={() => navigate('/')}>TELA INICIAL</button>
        </nav>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <h1 className="page-title">Gerenciamento de Usuários</h1>
        
        {/* Formulário de Cadastro */}
        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo*</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite o nome do usuário"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite o e-mail do usuário"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Digite o telefone do usuário"
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha*</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite uma senha segura"
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipo">Tipo de Usuário*</label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
              disabled={loading.tipos}
            >
              {tiposUsuario.map(tipo => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nome}
                </option>
              ))}
            </select>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading.cadastro}
          >
            {loading.cadastro ? (
              <>
                <span className="spinner"></span>
                Cadastrando...
              </>
            ) : 'Adicionar Usuário'}
          </button>

          {erro && <div className="error-message">{erro}</div>}
          {sucesso && <div className="success-message">{sucesso}</div>}
        </form>

        {/* Lista de Usuários */}
        <section className="users-section">
          <h2>Usuários Cadastrados</h2>
          
          {loading.lista ? (
            <div className="loading-spinner"></div>
          ) : usuarios.length === 0 ? (
            <p className="no-users">Nenhum usuário cadastrado</p>
          ) : (
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Tipo</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map(usuario => {
                    const tipoUsuario = tiposUsuario.find(t => t.id === usuario.tipo)?.nome || 'Desconhecido';
                    return (
                      <tr key={usuario.id}>
                        <td>{usuario.nome}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.telefone || '-'}</td>
                        <td>{tipoUsuario}</td>
                        <td>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDelete(usuario.id)}
                            title="Excluir usuário"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CadastroAdm;