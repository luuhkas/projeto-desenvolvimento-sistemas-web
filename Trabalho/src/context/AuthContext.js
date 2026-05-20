import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

// uma chave guarda a lista de usuarios cadastrados
// a outra guarda quem ta logado agora
const CHAVE_USUARIOS = 'estoque_usuarios';
const CHAVE_SESSAO = 'estoque_sessao';

// conta de teste pra nao precisar cadastrar tudo do zero
const usuarioPadrao = {
  nome: 'Administrador',
  email: 'admin@estoque.com',
  senha: '123456',
};

function lerUsuarios() {
  // localStorage so existe no browser, no servidor da erro
  if (typeof window === 'undefined') return [];
  const dados = window.localStorage.getItem(CHAVE_USUARIOS);
  if (!dados) {
    // primeira vez que abre, ja deixo o admin padrao salvo
    const inicial = [usuarioPadrao];
    window.localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(inicial));
    return inicial;
  }
  return JSON.parse(dados);
}

function salvarUsuarios(usuarios) {
  window.localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // roda uma vez quando carrega: tenta restaurar a sessao
  // do localStorage pra nao precisar logar de novo depois do refresh
  useEffect(() => {
    lerUsuarios();
    const sessao = window.localStorage.getItem(CHAVE_SESSAO);
    if (sessao) {
      setUsuario(JSON.parse(sessao));
    }
    setCarregando(false);
  }, []);

  function login(email, senha) {
    const usuarios = lerUsuarios();
    const encontrado = usuarios.find((u) => u.email === email && u.senha === senha);
    if (!encontrado) {
      return { ok: false, erro: 'E-mail ou senha incorretos.' };
    }
    // de proposito nao salvo a senha na sessao
    const dadosSessao = { nome: encontrado.nome, email: encontrado.email };
    window.localStorage.setItem(CHAVE_SESSAO, JSON.stringify(dadosSessao));
    setUsuario(dadosSessao);
    return { ok: true };
  }

  function cadastrar(nome, email, senha) {
    const usuarios = lerUsuarios();
    if (usuarios.some((u) => u.email === email)) {
      return { ok: false, erro: 'Já existe um usuário com este e-mail.' };
    }
    usuarios.push({ nome, email, senha });
    salvarUsuarios(usuarios);
    return { ok: true };
  }

  function logout() {
    window.localStorage.removeItem(CHAVE_SESSAO);
    setUsuario(null);
  }

  function listarUsuarios() {
    return lerUsuarios().map((u) => ({ nome: u.nome, email: u.email }));
  }

  return (
    <AuthContext.Provider
      value={{ usuario, carregando, login, cadastrar, logout, listarUsuarios }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
