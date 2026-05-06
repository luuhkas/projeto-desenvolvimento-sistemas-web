import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar() {
  const router = useRouter();

  const links = [
    { href: '/', texto: 'Home' },
    { href: '/usuarios', texto: 'Usuários' },
    { href: '/sobre', texto: 'Sobre' },
  ];

  function linkEstaAtivo(href) {
    if (href === '/') {
      return router.pathname === '/';
    }

    return router.pathname.startsWith(href);
  }

  return (
    <header className="navbar">
      <div className="navbar__content">
        <Link className="brand" href="/">
          UserNext
        </Link>

        <nav className="nav" aria-label="Navegação principal">
          {links.map((link) => (
            <Link
              key={link.href}
              className={linkEstaAtivo(link.href) ? 'nav__link nav__link--active' : 'nav__link'}
              href={link.href}
            >
              {link.texto}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
