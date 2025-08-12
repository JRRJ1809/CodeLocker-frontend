import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './CadastroAdm.css';

const CadastroAdm = () => {
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false); // Novo estado para o modal
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
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState(null);
  const [sortConfig, setSortConfig] = useState({ 
    key: 'nome', 
    direction: 'ascending' 
  });

  // Busca tipos de usuário (original)
  useEffect(() => {
    const fetchTiposUsuario = async () => {
      try {
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

  // Busca usuários cadastrados (original)
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = [
          { 
            id: 1, 
            nome: 'Admin Master', 
            email: 'master@senai.com', 
            telefone: '(11) 9999-9999', 
            tipo: 1 
          },
          { 
            id: 2, 
            nome: 'Professor João', 
            email: 'joao@senai.com', 
            telefone: '(11) 8888-8888', 
            tipo: 2 
          }
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

  // Funções originais (totalmente preservadas)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!formData.nome || !formData.email || !formData.senha || !formData.tipo) {
      setErro('Preencha todos os campos obrigatórios');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErro('E-mail inválido');
      return;
    }

    if (formData.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, cadastro: true }));
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
      setModalAberto(false); // Fecha o modal após cadastro
    } catch (error) {
      setErro('Erro ao cadastrar usuário. Tente novamente.');
    } finally {
      setLoading(prev => ({ ...prev, cadastro: false }));
    }
  };

  const handleDelete = async (id) => {
    try {
      setUsuarios(prev => prev.filter(user => user.id !== id));
      setSucesso('Usuário excluído com sucesso!');
      setUsuarioParaExcluir(null);
    } catch (error) {
      setErro('Erro ao excluir usuário');
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsuarios = useMemo(() => {
    return [...usuarios].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [usuarios, sortConfig]);

  return (
    <div className="cadastro-adm-container">
      {/* Cabeçalho Fixo (original) */}
      <header className="red-header">
        <div className="logo-container">
          <img src={senaiLogo} alt="Logo SENAI" className="senai-logo" />
          <h1 className="system-title"></h1>
        </div>
        <nav>
          <button onClick={() => navigate('/adm')}>CADASTRO ADM</button>
          <button onClick={() => navigate('/registros')}>REGISTROS</button>
          <button className="active" onClick={() => navigate('/cadastroadm')}>CRIAR USUÁRIO</button>
          <button onClick={() => navigate('/salasvisaoadm')}>SALAS DISPONÍVEIS</button>
          <button onClick={() => navigate('/')}>TELA INICIAL</button>
        </nav>
      </header>

      {/* Modal de Cadastro (NOVO - mas com o formulário original dentro) */}
      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              onClick={() => {
                setModalAberto(false);
                setErro('');
                setSucesso('');
              }} 
              className="close-modal-btn"
            >
              X
            </button>
            <h2>Cadastrar Novo Usuário</h2>
            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-group">
                <label htmlFor="nome">Nome Completo <span className="required">*</span></label>
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
                <label htmlFor="email">E-mail <span className="required">*</span></label>
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
                <label htmlFor="senha">Senha <span className="required">*</span></label>
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
                <label htmlFor="tipo">Tipo de Usuário <span className="required">*</span></label>
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
                ) : 'Salvar'}
              </button>

              {erro && <div className="error-message">{erro}</div>}
              {sucesso && <div className="success-message">{sucesso}</div>}
            </form>
          </div>
        </div>
      )}

      {/* Conteúdo Principal (original) */}
      <main className="main-content">
        <h1 className="page-title">Gerenciamento de Usuários</h1>
        
        {/* Botão para abrir o modal (NOVO) */}
        <button 
          onClick={() => setModalAberto(true)} 
          className="open-modal-btn"
        >
          + Adicionar Usuário
        </button>

        {/* Lista de Usuários (original) */}
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
                    <th onClick={() => handleSort('nome')}>
                      Nome {sortConfig.key === 'nome' && (
                        sortConfig.direction === 'ascending' ? '↑' : '↓'
                      )}
                    </th>
                    <th onClick={() => handleSort('email')}>
                      E-mail {sortConfig.key === 'email' && (
                        sortConfig.direction === 'ascending' ? '↑' : '↓'
                      )}
                    </th>
                    <th onClick={() => handleSort('telefone')}>
                      Telefone {sortConfig.key === 'telefone' && (
                        sortConfig.direction === 'ascending' ? '↑' : '↓'
                      )}
                    </th>
                    <th>Tipo</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsuarios.map(usuario => {
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
                            onClick={() => setUsuarioParaExcluir(usuario)}
                            title="Excluir usuário"
                          >
                            🗑️
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

      {/* Modal de Confirmação de Exclusão (original) */}
      {usuarioParaExcluir && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal">
            <h3>Confirmar Exclusão</h3>
            <p>Tem certeza que deseja excluir o usuário {usuarioParaExcluir.nome}?</p>
            <div className="modal-buttons">
              <button 
                className="confirm-btn"
                onClick={() => handleDelete(usuarioParaExcluir.id)}
              >
                Confirmar
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setUsuarioParaExcluir(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CadastroAdm;