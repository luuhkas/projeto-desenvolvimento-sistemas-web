function Sobre() {
  return (
    <main className="app-shell">
      <section className="page-heading">
        <p className="eyebrow">Sobre</p>
        <h1>Sobre o sistema</h1>
        <p>
          O Estoque+ é um sistema acadêmico desenvolvido como trabalho da disciplina de
          Projeto e Desenvolvimento de Sistemas Web. Aplica componentização, hooks do
          React, gerenciamento de estado local, navegação entre telas e proteção de
          rotas.
        </p>
      </section>

      <section className="card-grid">
        <article className="card">
          <span>Stack</span>
          <strong>Next.js</strong>
          <p>Roteamento por arquivos com Pages Router.</p>
        </article>
        <article className="card">
          <span>Estado</span>
          <strong>Context</strong>
          <p>useState, useEffect e useContext para autenticação.</p>
        </article>
        <article className="card">
          <span>Proteção</span>
          <strong>RotaPrivada</strong>
          <p>Middleware bloqueando acesso de não autenticados.</p>
        </article>
        <article className="card">
          <span>Próximo</span>
          <strong>Back-end</strong>
          <p>Estrutura pronta para integrar com API futuramente.</p>
        </article>
      </section>
    </main>
  );
}

export default Sobre;
