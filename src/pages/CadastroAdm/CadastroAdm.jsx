import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import senaiLogo from '../../assets/senai-logo.png';
import './CadastroAdm.css';

const CadastroAdm = () => {
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
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

  const fetchUsuarios = async () => {
    try {
      setLoading(prev => ({ ...prev, lista: true }));
      const response = await fetch('http://10.90.146.23:7010/api/Usuarios/ListarUsuarios');
      if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsuarios(data);
      } else {
        setErro('Resposta inesperada da API');
      }
    } catch (error) {
      console.error('Erro ao carregar lista de usuários:', error);
      setErro('Erro ao carregar lista de usuários');
    } finally {
      setLoading(prev => ({ ...prev, lista: false }));
    }
  };

  // Busca tipos de usuário
  useEffect(() => {
    const fetchTiposUsuario = async () => {
      try {
        setLoading(prev => ({ ...prev, tipos: true }));
        const response = await fetch("http://10.90.146.23:7010/api/Tipos/ListarTipos");
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        setTiposUsuario(data);
        setFormData(prev => ({ ...prev, tipo: data[0]?.id.toString() || '' }));
      } catch (error) {
        console.error('Erro ao carregar tipos de usuário: ', error);
        setErro('Erro ao carregar tipos de usuário');
      } finally {
        setLoading(prev => ({ ...prev, tipos: false }));
      }
    };
    fetchTiposUsuario();
  }, []);

  // Busca usuários cadastrados
  useEffect(() => {
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

      const novoUsuario = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        senha: formData.senha,
        tipo: parseInt(formData.tipo)
      };

      const response = await fetch('http://10.90.146.23:7010/api/Usuarios/CadastrarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
      }

      await fetchUsuarios();
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        senha: '',
        tipo: tiposUsuario[0]?.id.toString() || ''
      });
      setSucesso('Usuário cadastrado com sucesso!');
      setModalAberto(false);
    } catch (error) {
      setErro('Erro ao cadastrar usuário. Tente novamente.');
    } finally {
      setLoading(prev => ({ ...prev, cadastro: false }));
    }
  };

  const handleDelete = async (id) => {
    setErro('');
    setSucesso('');
    console.log("Tentando excluir ID:", id);

    try {
      // 1º - Tenta com query string
      let response = await fetch(`http://10.90.146.23:7010/api/Usuarios/DeletarUsuario?id=${id}`, {
        method: 'DELETE',
      });
      console.log("Query string delete:", response.status);
      if (response.ok) {
        await fetchUsuarios();
        setSucesso('Usuário excluído com sucesso!');
        setUsuarioParaExcluir(null);
        return;
      }

      // 2º - Tenta com segment na URL
      response = await fetch(`http://10.90.146.23:7010/api/Usuarios/DeletarUsuario/${id}`, {
        method: 'DELETE',
      });
      console.log("Segment delete:", response.status);
      if (response.ok) {
        await fetchUsuarios();
        setSucesso('Usuário excluído com sucesso!');
        setUsuarioParaExcluir(null);
        return;
      }

      // 3º - Tenta enviando no body
      response = await fetch(`http://10.90.146.23:7010/api/Usuarios/DeletarUsuario`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      console.log("Body delete:", response.status);
      if (response.ok) {
        await fetchUsuarios();
        setSucesso('Usuário excluído com sucesso!');
        setUsuarioParaExcluir(null);
        return;
      }

      throw new Error("Nenhum dos formatos de exclusão funcionou");
    } catch (error) {
      console.error("Erro ao excluir:", error);
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
      const aValue = a[sortConfig.key] ?? '';
      const bValue = b[sortConfig.key] ?? '';
      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [usuarios, sortConfig]);

  return (
    <div className="cadastro-adm-container">
      <header className="red-header">
        <div className="logo-container">
          <img src={senaiLogo} alt="Logo SENAI" className="senai-logo" />
          <h1 className="system-title"></h1>
        </div>
        <nav>
          <button onClick={() => navigate('/adm')}>CADASTRO ADM</button>
          <button className="active" onClick={() => navigate('/cadastroadm')}>CRIAR USUÁRIO</button>
          <button onClick={() => navigate('/salasvisaoadm')}>SALAS DISPONÍVEIS</button>
          <button onClick={() => navigate('/')}>TELA INICIAL</button>
        </nav>
      </header>

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
                      {tipo.tipo}
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

      <main className="main-content">
        <h1 className="page-title">Gerenciamento de Usuários</h1>
        <button
          onClick={() => setModalAberto(true)}
          className="open-modal-btn"
        >
          + Adicionar Usuário
        </button>
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
                    const tipoUsuario = tiposUsuario.find(t => t.id === usuario.tipo)?.tipo || 'Desconhecido';
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
