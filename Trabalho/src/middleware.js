import { NextResponse } from "next/server";
import { CHAVE_SESSAO } from "@/lib/auth";

// Controle de acesso via middleware do proprio Next.js:
// roda no servidor antes de cada rota listada no matcher e decide
// se deixa passar, bloqueia ou redireciona.
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessao = request.cookies.get(CHAVE_SESSAO);
  const estaLogado = Boolean(sessao?.value);
  const rotaPrivada = pathname.startsWith("/admin");

  // 1) usuario nao autenticado tentando acessar area restrita -> manda pro login
  if (rotaPrivada && !estaLogado) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // 2) usuario ja logado nao precisa ver login/cadastro -> manda pro painel
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
