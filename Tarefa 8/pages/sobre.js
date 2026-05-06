function Sobre() {
  return (
    <main className="app-shell">
      <section className="about-layout">
        <div className="page-heading page-heading--compact">
          <p className="eyebrow">Sobre</p>
          <h1>Projeto da Tarefa 8</h1>
          <p>
            Esta aplicação foi criada para praticar Next.js com Pages Router,
            navegação entre páginas, rotas dinâmicas e Hooks do React.
          </p>
        </div>

        <aside className="detail-card">
          <h2>Conceitos aplicados</h2>
          <ul className="concept-list">
            <li>Rotas criadas por arquivos dentro da pasta pages.</li>
            <li>Navbar com links usando o componente Link do Next.js.</li>
            <li>useState para armazenar dados carregados na tela.</li>
            <li>useEffect para carregar dados, reagir ao ID da URL e executar cleanup.</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}

export default Sobre;
