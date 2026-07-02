"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Package } from "lucide-react";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

const linksPublicos = [
  { href: "/", texto: "Home" },
  { href: "/sobre", texto: "Sobre" },
  { href: "/contato", texto: "Contato" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { usuario, logout } = useAuth();

  function estaAtivo(href) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  function aoSair() {
    logout();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-[min(1120px,92vw)] flex-wrap items-center justify-between gap-3 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold">
          <Package className="size-5 text-primary" />
          Estoque+
        </Link>

        <nav className="flex flex-wrap items-center gap-1.5" aria-label="Navegação principal">
          {linksPublicos.map((link) => (
            <Button
              key={link.href}
              asChild
              size="sm"
              variant={estaAtivo(link.href) ? "default" : "ghost"}
            >
              <Link href={link.href}>{link.texto}</Link>
            </Button>
          ))}

          {usuario && (
            <Button asChild size="sm" variant={estaAtivo("/admin") ? "default" : "ghost"}>
              <Link href="/admin">Admin</Link>
            </Button>
          )}

          {["ADMIN", "SUPER_ADMIN"].includes(usuario?.papel) && (
            <Button asChild size="sm" variant={estaAtivo("/admin/convidar") ? "default" : "ghost"}>
              <Link href="/admin/convidar">Convidar</Link>
            </Button>
          )}

          {usuario?.papel === "SUPER_ADMIN" && (
            <Button asChild size="sm" variant={estaAtivo("/admin/backoffice") ? "default" : "ghost"}>
              <Link href="/admin/backoffice">Backoffice</Link>
            </Button>
          )}

          {usuario ? (
            <Button size="sm" variant="outline" onClick={aoSair}>
              <LogOut />
              Sair ({usuario.nome.split(" ")[0]} · {usuario.papel})
            </Button>
          ) : (
            <Button asChild size="sm" variant={estaAtivo("/login") ? "default" : "secondary"}>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
