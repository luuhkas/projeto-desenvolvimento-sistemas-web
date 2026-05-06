import Link from 'next/link';

function Home() {
  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Tarefa 8 - Next.js</p>
          <h1>Sistema simples de usuários</h1>
          <p>
            Aplicação criada com roteamento por arquivos, navegação sem recarregar a página,
            estado com useState e carregamento de dados com useEffect.
          </p>

          <div className="hero__actions">
            <Link className="button button--primary" href="/usuarios">
              Ver usuários
            </Link>
            <Link className="button" href="/sobre">
              Sobre o projeto
            </Link>
          </div>
        </div>

        <aside className="info-panel" aria-label="Resumo dos recursos">
          <span>Pages Router</span>
          <strong>4 rotas</strong>
          <p>/, /usuarios, /usuarios/[id] e /sobre</p>
        </aside>
      </section>
    </main>
  );
}

export default Home;
