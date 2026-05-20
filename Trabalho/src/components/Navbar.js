import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext.js';

function Navbar() {
  const router = useRouter();
  const { usuario, logout } = useAuth();

  const linksPublicos = [
    { href: '/', texto: 'Home' },
    { href: '/sobre', texto: 'Sobre' },
    { href: '/contato', texto: 'Contato' },
  ];

  const linksPrivados = [{ href: '/admin', texto: 'Admin' }];

  // checa se a rota atual bate com o link pra deixar destacado
  // a Home eh o unico caso especial porque startsWith('/') daria true em tudo
  function linkEstaAtivo(href) {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  }

  function aoSair() {
    logout();
    router.push('/');
  }

  return (
    <header className="navbar">
      <div className="navbar__content">
        <Link className="brand" href="/">
          Estoque+
        </Link>

        <nav className="nav" aria-label="Navegação principal">
          {linksPublicos.map((link) => (
            <Link
              key={link.href}
              className={linkEstaAtivo(link.href) ? 'nav__link nav__link--active' : 'nav__link'}
              href={link.href}
            >
              {link.texto}
            </Link>
          ))}

          {usuario &&
            linksPrivados.map((link) => (
              <Link
                key={link.href}
                className={linkEstaAtivo(link.href) ? 'nav__link nav__link--active' : 'nav__link'}
                href={link.href}
              >
                {link.texto}
              </Link>
            ))}

          {usuario ? (
            <button className="nav__link nav__link--logout" onClick={aoSair} type="button">
              Sair ({usuario.nome.split(' ')[0]})
            </button>
          ) : (
            <Link
              className={linkEstaAtivo('/login') ? 'nav__link nav__link--active' : 'nav__link'}
              href="/login"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
