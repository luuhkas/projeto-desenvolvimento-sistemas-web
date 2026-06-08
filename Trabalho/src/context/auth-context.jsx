"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  lerUsuarios,
  salvarUsuarios,
  lerSessao,
  salvarSessao,
  limparSessao,
} from "@/lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // ao montar: garante o admin padrao e restaura a sessao do cookie
  useEffect(() => {
    lerUsuarios();
    setUsuario(lerSessao());
    setCarregando(false);
  }, []);

  function login(email, senha) {
    const encontrado = lerUsuarios().find(
      (u) => u.email === email && u.senha === senha
    );
    if (!encontrado) {
      return { ok: false, erro: "E-mail ou senha incorretos." };
    }
    const sessao = { nome: encontrado.nome, email: encontrado.email };
    salvarSessao(sessao);
    setUsuario(sessao);
    return { ok: true };
  }

  function cadastrar(nome, email, senha) {
    const usuarios = lerUsuarios();
    if (usuarios.some((u) => u.email === email)) {
      return { ok: false, erro: "Já existe um usuário com este e-mail." };
    }
    salvarUsuarios([...usuarios, { nome, email, senha }]);
    return { ok: true };
  }

  function logout() {
    limparSessao();
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
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  }
  return contexto;
}
