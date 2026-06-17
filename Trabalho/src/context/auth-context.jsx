"use client";

import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { api } from "@/lib/api";
import { salvarSessao, lerUsuario, limparSessao } from "@/lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // restaura o usuário a partir do cookie ao montar
  useEffect(() => {
    setUsuario(lerUsuario());
    setCarregando(false);
  }, []);

  // login: chama a API, guarda o token e os dados do usuário
  async function login(email, senha) {
    try {
      const dados = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, senha }),
      });
      salvarSessao(dados.token, dados.usuario);
      setUsuario(dados.usuario);
      return { ok: true };
    } catch (erro) {
      return { ok: false, erro: erro.message };
    }
  }

  // cadastro: cria o usuário na API
  async function cadastrar(nome, email, senha) {
    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify({ nome, email, senha }),
      });
      return { ok: true };
    } catch (erro) {
      return { ok: false, erro: erro.message };
    }
  }

  function logout() {
    limparSessao();
    setUsuario(null);
  }

  // lista os usuários (rota privada — o token vai junto pela api())
  async function listarUsuarios() {
    return api("/usuarios");
  }

  return (
    <AuthContext.Provider
      value={{ usuario, carregando, login, cadastrar, logout, listarUsuarios }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  }
  return contexto;
}
