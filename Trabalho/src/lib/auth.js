import Cookies from "js-cookie";

// cookies da sessão. O middleware lê o TOKEN para proteger as rotas /admin;
// o USUARIO guarda nome/email só para exibição no front.
export const CHAVE_TOKEN = "estoque_token";
export const CHAVE_USUARIO = "estoque_usuario";

const opcoes = { expires: 1, sameSite: "lax", path: "/" };

// guarda o token JWT e os dados do usuário após o login
export function salvarSessao(token, usuario) {
  Cookies.set(CHAVE_TOKEN, token, opcoes);
  Cookies.set(CHAVE_USUARIO, JSON.stringify(usuario), opcoes);
}

// lê o usuário salvo no cookie (para restaurar a sessão ao recarregar a página)
export function lerUsuario() {
  const bruto = Cookies.get(CHAVE_USUARIO);
  if (!bruto) return null;
  try {
    return JSON.parse(bruto);
  } catch {
    return null;
  }
}

export function limparSessao() {
  Cookies.remove(CHAVE_TOKEN, { path: "/" });
  Cookies.remove(CHAVE_USUARIO, { path: "/" });
}
