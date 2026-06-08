"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const abas = [
  { href: "/admin/estoque", texto: "Visualização" },
  { href: "/admin/estoque/baixas", texto: "Baixas" },
  { href: "/admin/estoque/cadastros", texto: "Cadastros" },
  { href: "/admin/estoque/metricas", texto: "Métricas" },
  { href: "/admin/estoque/relatorios", texto: "Relatórios" },
];

export default function EstoqueLayout({ children }) {
  const pathname = usePathname();

  function ehAtiva(href) {
    if (href === "/admin/estoque") return pathname === "/admin/estoque";
    return pathname === href;
  }

  return (
    <main className="mx-auto w-[min(1120px,92vw)] py-12">
      <nav
        className="mb-6 flex flex-wrap gap-1.5 border-b pb-3"
        aria-label="Seções do estoque"
      >
        {abas.map((aba) => (
          <Link
            key={aba.href}
            href={aba.href}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              ehAtiva(aba.href)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {aba.texto}
          </Link>
        ))}
      </nav>
      {children}
    </main>
  );
}
