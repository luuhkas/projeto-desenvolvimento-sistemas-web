import React from 'react';

function CardPerfil({ perfil, destaque = false }) {
  return (
    <article className={destaque ? 'profile-card profile-card--featured' : 'profile-card'}>
      <img className="profile-card__image" src={perfil.imagem} alt={`Avatar ilustrado de ${perfil.nome}`} />

      <div className="profile-card__body">
        <p className="tag">{perfil.cargo}</p>
        <h2>{perfil.nome}</h2>
        <p>{perfil.resumo}</p>
        <span>{perfil.local}</span>
      </div>
    </article>
  );
}

export default CardPerfil;
