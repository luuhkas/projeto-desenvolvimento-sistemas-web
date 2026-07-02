"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";

import { api } from "@/lib/api";

const EstoqueContext = createContext(null);

// Fonte única de verdade do estoque: produtos e baixas vêm da API (back-end).
// Todas as telas leem daqui, então ficam coerentes entre si.
export function EstoqueProvider({ children }) {
  const [produtos, setProdutos] = useState([]);
  const [baixas, setBaixas] = useState([]);

  // busca produtos e baixas na API
  const carregar = useCallback(async () => {
    try {
      const [listaProdutos, listaBaixas] = await Promise.all([
        api("/produtos?limite=100"),
        api("/baixas"),
      ]);
      setProdutos(listaProdutos?.dados ?? []);
      setBaixas(listaBaixas ?? []);
    } catch {
      // se a API estiver fora, mantém as listas vazias
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  // cria um produto via API e recarrega as listas
  async function adicionarProduto(dados) {
    try {
      await api("/produtos", { method: "POST", body: JSON.stringify(dados) });
      await carregar();
      return { ok: true };
    } catch (erro) {
      return { ok: false, erro: erro.message };
    }
  }

  // registra uma baixa via API (o back-end desconta do estoque) e recarrega
  async function registrarBaixa({ produtoId, quantidade }) {
    try {
      await api("/baixas", {
        method: "POST",
        body: JSON.stringify({ produtoId, quantidade }),
      });
      await carregar();
      return { ok: true };
    } catch (erro) {
      return { ok: false, erro: erro.message };
    }
  }

  return (
    <EstoqueContext.Provider
      value={{ produtos, baixas, adicionarProduto, registrarBaixa }}
    >
      {children}
    </EstoqueContext.Provider>
  );
}

EstoqueProvider.propTypes = {
  children: PropTypes.node,
};

export function useEstoque() {
  const contexto = useContext(EstoqueContext);
  if (!contexto) {
    throw new Error("useEstoque deve ser usado dentro de um EstoqueProvider.");
  }
  return contexto;
}
