import React, { useState } from 'react';
import Header from './components/Header.jsx';
import CardPerfil from './components/CardPerfil.jsx';
import ListaHabilidades from './components/ListaHabilidades.jsx';
import { habilidades, perfil, projetos } from './data/perfil.js';

function Inicio() {
  return (
    <section className="page page--hero">
      <div className="hero-copy">
        <p className="eyebrow">React, componentes e JSX</p>
        <h2>Um recorte de portfólio feito como SPA</h2>
        <p>
          Uma interface simples para apresentar perfil, evolução nas tarefas e habilidades
          praticadas, usando componentes funcionais, props, estado e listas em JSX.
        </p>
      </div>

      <CardPerfil perfil={perfil} destaque />
    </section>
  );
}

function Perfil() {
  return (
    <section className="page page--split">
      <CardPerfil perfil={perfil} />

      <div className="panel">
        <p className="eyebrow">Linha de evolução</p>
        <h2>Do HTML estático ao React</h2>

        <div className="project-list">
          {projetos.map((projeto) => (
            <article className="project-card" key={projeto.id}>
              <span>0{projeto.id}</span>
              <h3>{projeto.titulo}</h3>
              <p>{projeto.descricao}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Habilidades() {
  const habilidadesReact = habilidades.filter((habilidade) => habilidade.nome.includes('React'));

  return (
    <section className="page page--skills">
      <ListaHabilidades habilidades={habilidades} />

      <aside className="panel panel--dark">
        <p className="eyebrow">JSX em prática</p>
        <h2>{habilidadesReact.length > 0 ? 'React entrou no fluxo de estudo' : 'React ainda será estudado'}</h2>
        <p>
          Este bloco usa renderização condicional com operador ternário. A lista ao lado
          vem de um array renderizado com map, mantendo uma key única para cada item.
        </p>
      </aside>
    </section>
  );
}

function App() {
  const [paginaAtual, setPaginaAtual] = useState('inicio');

  const paginas = {
    inicio: <Inicio />,
    perfil: <Perfil />,
    habilidades: <Habilidades />,
  };

  return (
    <>
      <Header paginaAtual={paginaAtual} aoNavegar={setPaginaAtual} />

      <main className="app-shell">
        {paginas[paginaAtual]}
      </main>
    </>
  );
}

export default App;
