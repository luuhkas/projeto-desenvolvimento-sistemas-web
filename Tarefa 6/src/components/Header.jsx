import React from 'react';

function Header({ paginaAtual, aoNavegar }) {
  const links = [
    { id: 'inicio', texto: 'Início' },
    { id: 'perfil', texto: 'Perfil' },
    { id: 'habilidades', texto: 'Habilidades' },
  ];

  return (
    <header className="header">
      <div className="header__content">
        <div>
          <p className="eyebrow">Tarefa 6 - React</p>
          <h1>Lucas.dev</h1>
        </div>

        <nav className="nav" aria-label="Navegação principal">
          {links.map((link) => (
            <button
              key={link.id}
              className={paginaAtual === link.id ? 'nav__link nav__link--active' : 'nav__link'}
              type="button"
              onClick={() => aoNavegar(link.id)}
            >
              {link.texto}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
