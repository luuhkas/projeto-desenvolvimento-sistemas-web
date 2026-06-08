import Cookies from "js-cookie";

// nome do cookie de sessao — o middleware tambem usa esse mesmo nome
export const CHAVE_SESSAO = "estoque_sessao";
// lista de usuarios cadastrados fica no localStorage (front-end sem back-end)
const CHAVE_USUARIOS = "estoque_usuarios";

// conta de teste pra nao precisar cadastrar do zero
const usuarioPadrao = {
  nome: "Administrador",
  email: "admin@estoque.com",
  senha: "123456",
};

export function lerUsuarios() {
  if (typeof window === "undefined") return [usuarioPadrao];
  const dados = window.localStorage.getItem(CHAVE_USUARIOS);
  if (!dados) {
    // primeira vez: ja deixa o admin padrao salvo
    window.localStorage.setItem(CHAVE_USUARIOS, JSON.stringify([usuarioPadrao]));
    return [usuarioPadrao];
  }
  return JSON.parse(dados);
}

export function salvarUsuarios(usuarios) {
  window.localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
}

// a sessao vai num cookie (e nao no localStorage) justamente pra que o
// middleware do Next consiga le-la no servidor e proteger as rotas /admin
export function lerSessao() {
  const bruto = Cookies.get(CHAVE_SESSAO);
  if (!bruto) return null;
  try {
    return JSON.parse(bruto);
  } catch {
    return null;
  }
}

export function salvarSessao(usuario) {
  Cookies.set(CHAVE_SESSAO, JSON.stringify(usuario), {
    expires: 1,
    sameSite: "lax",
    path: "/",
  });
}

export function limparSessao() {
  Cookies.remove(CHAVE_SESSAO, { path: "/" });
}
