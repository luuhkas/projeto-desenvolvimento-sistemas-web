import Cookies from "js-cookie";

import { CHAVE_TOKEN } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

// faz uma requisição à API. Anexa o token JWT (quando existir) e o
// Content-Type quando há corpo. Lança erro com a mensagem da API se falhar.
export async function api(caminho, opcoes = {}) {
  const token = Cookies.get(CHAVE_TOKEN);
  const headers = { ...(opcoes.headers ?? {}) };
  if (opcoes.body) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const resposta = await fetch(`${API_URL}${caminho}`, { ...opcoes, headers });

  // 204 (sem conteúdo) não tem corpo para ler
  const dados =
    resposta.status === 204 ? null : await resposta.json().catch(() => null);

  if (!resposta.ok) {
    throw new Error(dados?.erro || dados?.message || "Erro na requisição.");
  }
  return dados;
}
