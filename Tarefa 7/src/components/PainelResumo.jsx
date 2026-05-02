import React from 'react';

function PainelResumo({ contador, minimo, maximo, step }) {
  const noMinimo = contador === minimo;
  const noMaximo = contador === maximo;
  const intervaloUnico = minimo === maximo;
  const statusMensagem = intervaloUnico
    ? 'O mínimo e o máximo estão iguais, então o contador está travado nesse valor.'
    : noMinimo
      ? 'O contador está no limite mínimo.'
      : noMaximo
        ? 'O contador está no limite máximo.'
        : 'O contador está dentro do intervalo configurado.';
  const estaNoLimite = intervaloUnico || noMinimo || noMaximo;

  return (
    <aside className="summary" aria-label="Resumo do contador">
      <p className="eyebrow">Estado atual</p>
      <strong className="counter-value">{contador}</strong>

      <dl className="summary__grid">
        <div>
          <dt>Mínimo</dt>
          <dd>{minimo}</dd>
        </div>
        <div>
          <dt>Máximo</dt>
          <dd>{maximo}</dd>
        </div>
        <div>
          <dt>Step</dt>
          <dd>{step}</dd>
        </div>
      </dl>

      <p className={estaNoLimite ? 'status status--limit' : 'status'}>
        {statusMensagem}
      </p>
    </aside>
  );
}

export default PainelResumo;
