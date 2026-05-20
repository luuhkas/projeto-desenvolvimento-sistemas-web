import Link from 'next/link';

function Home() {
  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Trabalho de Front-end</p>
          <h1>Sistema de Estoque</h1>
          <p>
            Aplicação para gestão de estoque com páginas públicas, login e área administrativa
            protegida. Construída com Next.js, React Hooks e proteção de rotas.
          </p>

          <div className="hero__actions">
            <Link className="button button--primary" href="/login">
              Entrar no sistema
            </Link>
            <Link className="button" href="/sobre">
              Sobre o projeto
            </Link>
            <Link className="button" href="/contato">
              Contato
            </Link>
          </div>
        </div>

        <aside className="info-panel" aria-label="Resumo do projeto">
          <span>Front-end</span>
          <strong>10+</strong>
          <p>rotas entre públicas e privadas, com middleware de autenticação.</p>
        </aside>
      </section>
    </main>
  );
}

export default Home;
