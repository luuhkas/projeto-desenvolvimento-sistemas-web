import { NextResponse } from "next/server";

// nome do cookie do token (definido inline para o middleware não importar
// a lib js-cookie, que é só de navegador)
const CHAVE_TOKEN = "estoque_token";
const CHAVE_USUARIO = "estoque_usuario";
// rota (por prefixo) -> papéis que podem entrar
const REGRAS = {
  "/admin/usuarios": ["ADMIN", "SUPER_ADMIN"],
  "/admin/convidar": ["ADMIN", "SUPER_ADMIN"],
  "/admin/backoffice": ["SUPER_ADMIN"],
};

// Controle de acesso via middleware do próprio Next.js:
// roda no servidor antes de cada rota do matcher e decide se passa ou redireciona.
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(CHAVE_TOKEN);
  const estaLogado = Boolean(token?.value);
  const rotaPrivada = pathname.startsWith("/admin");

  // 1) sem token tentando acessar área restrita -> manda pro login
  if (rotaPrivada && !estaLogado) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // 1.5) rotas exclusivas por papel: confere o papel guardado no cookie.
  //      Isto é UX — a barreira real é o 403 da política ABAC no back-end.
  if (estaLogado) {
    const regra = Object.entries(REGRAS).find(([rota]) => pathname.startsWith(rota));
    if (regra) {
      let papel = null;
      try {
        const bruto = request.cookies.get(CHAVE_USUARIO)?.value;
        if (bruto) papel = JSON.parse(decodeURIComponent(bruto)).papel;
      } catch {
        papel = null;
      }
      if (!regra[1].includes(papel)) {
        const url = request.nextUrl.clone();
        url.pathname = "/admin"; // sem permissão -> volta pro painel
        return NextResponse.redirect(url);
      }
    }
  }

  // 2) já logado não precisa ver login/cadastro -> manda pro painel
  if (estaLogado && (pathname === "/login" || pathname === "/cadastro")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/cadastro"],
};
