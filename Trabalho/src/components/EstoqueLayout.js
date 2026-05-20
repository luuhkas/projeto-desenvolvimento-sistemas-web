import Link from 'next/link';
import { useRouter } from 'next/router';

const abas = [
  { href: '/admin/estoque', texto: 'Visualização' },
  { href: '/admin/estoque/baixas', texto: 'Baixas' },
  { href: '/admin/estoque/cadastros', texto: 'Cadastros' },
  { href: '/admin/estoque/metricas', texto: 'Métricas' },
  { href: '/admin/estoque/relatorios', texto: 'Relatórios' },
];

function EstoqueLayout({ children }) {
  const router = useRouter();

  function ehAtiva(href) {
    if (href === '/admin/estoque') return router.pathname === '/admin/estoque';
    return router.pathname === href;
  }

  return (
    <main className="app-shell">
      <nav className="subnav" aria-label="Seções do estoque">
        {abas.map((aba) => (
          <Link
            key={aba.href}
            className={ehAtiva(aba.href) ? 'nav__link nav__link--active' : 'nav__link'}
            href={aba.href}
          >
            {aba.texto}
          </Link>
        ))}
      </nav>
      {children}
    </main>
  );
}

export default EstoqueLayout;
