import React from 'react';

function ListaHabilidades({ habilidades, compacta = false }) {
  return (
    <section className={compacta ? 'skills skills--compact' : 'skills'}>
      <div className="section-heading">
        <p className="eyebrow">ListaHabilidades</p>
        <h2>Habilidades praticadas</h2>
      </div>

      <ul className="skills__list">
        {habilidades.map((habilidade) => (
          <li className="skills__item" key={habilidade.id}>
            <span>{habilidade.nome}</span>
            <strong>{habilidade.nivel}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ListaHabilidades;
