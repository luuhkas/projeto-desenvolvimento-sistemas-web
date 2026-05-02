import React, { useState } from 'react';
import CampoNumero from './components/CampoNumero.jsx';
import PainelResumo from './components/PainelResumo.jsx';

const MENOR_STEP_VALIDO = 0.01;

function limitarValor(valor, minimo, maximo) {
  return Math.min(Math.max(valor, minimo), maximo);
}

function normalizarNumero(valor, fallback) {
  return Number.isFinite(valor) ? valor : fallback;
}

function App() {
  const [contador, setContador] = useState(0);
  const [step, setStep] = useState(1);
  const [minimo, setMinimo] = useState(0);
  const [maximo, setMaximo] = useState(10);

  function incrementar() {
    setContador((valorAtual) => limitarValor(valorAtual + step, minimo, maximo));
  }

  function decrementar() {
    setContador((valorAtual) => limitarValor(valorAtual - step, minimo, maximo));
  }

  function resetar() {
    const valorInicial = minimo > 0 ? minimo : 0;
    setContador(limitarValor(valorInicial, minimo, maximo));
  }

  function atualizarStep(valor) {
    const novoStep = Math.max(MENOR_STEP_VALIDO, normalizarNumero(valor, step));
    setStep(novoStep);
  }

  function atualizarMinimo(valor) {
    const novoMinimo = normalizarNumero(valor, minimo);
    const novoMaximo = Math.max(maximo, novoMinimo);

    setMinimo(novoMinimo);
    setMaximo(novoMaximo);
    setContador((valorAtual) => limitarValor(valorAtual, novoMinimo, novoMaximo));
  }

  function atualizarMaximo(valor) {
    const novoMaximo = normalizarNumero(valor, maximo);
    const novoMinimo = Math.min(minimo, novoMaximo);

    setMinimo(novoMinimo);
    setMaximo(novoMaximo);
    setContador((valorAtual) => limitarValor(valorAtual, novoMinimo, novoMaximo));
  }

  const estaNoMinimo = contador === minimo;
  const estaNoMaximo = contador === maximo;

  return (
    <>
      <header className="header">
        <div className="header__content">
          <div>
            <p className="eyebrow">Tarefa 7 - React Hooks</p>
            <h1>Contador com limites e step</h1>
          </div>
        </div>
      </header>

      <main className="app-shell">
        <section className="counter-layout">
          <div className="panel">
            <p className="eyebrow">useState em prática</p>
            <h2>Controle completo do contador</h2>
            <p>
              Os inputs abaixo atualizam o estado do componente. Quando mínimo, máximo
              ou step mudam, o contador continua respeitando o intervalo definido.
            </p>

            <div className="controls" aria-label="Ações do contador">
              <button type="button" onClick={decrementar} disabled={estaNoMinimo}>
                Decrementar
              </button>
              <button type="button" onClick={resetar}>
                Resetar
              </button>
              <button type="button" onClick={incrementar} disabled={estaNoMaximo}>
                Incrementar
              </button>
            </div>

            <div className="fields">
              <CampoNumero
                id="step"
                label="Step"
                min={MENOR_STEP_VALIDO}
                step="any"
                value={step}
                onChange={atualizarStep}
              />
              <CampoNumero id="minimo" label="Mínimo" value={minimo} onChange={atualizarMinimo} />
              <CampoNumero id="maximo" label="Máximo" value={maximo} onChange={atualizarMaximo} />
            </div>
          </div>

          <PainelResumo contador={contador} minimo={minimo} maximo={maximo} step={step} />
        </section>
      </main>
    </>
  );
}

export default App;
