import RotaPrivada from '../../../src/components/RotaPrivada.js';
import EstoqueLayout from '../../../src/components/EstoqueLayout.js';
import { produtosMock, baixasMock } from '../../../src/data/estoque.js';

function Metricas() {
  const totalItens = produtosMock.reduce((acc, p) => acc + p.quantidade, 0);
  const abaixoMinimo = produtosMock.filter((p) => p.quantidade < p.minimo).length;
  const totalBaixas = baixasMock.reduce((acc, b) => acc + b.quantidade, 0);
  // Set ignora repetidos, entao da pra contar quantas categorias diferentes existem
  const categorias = new Set(produtosMock.map((p) => p.categoria)).size;

  return (
    <EstoqueLayout>
      <section className="page-heading">
        <p className="eyebrow">Estoque</p>
        <h1>Métricas</h1>
        <p>Indicadores resumidos do estoque atual.</p>
      </section>

      <section className="card-grid">
        <article className="card">
          <span>Itens em estoque</span>
          <strong>{totalItens}</strong>
          <p>unidades disponíveis no total.</p>
        </article>
        <article className="card">
          <span>Categorias</span>
          <strong>{categorias}</strong>
          <p>categorias distintas cadastradas.</p>
        </article>
        <article className="card">
          <span>Abaixo do mínimo</span>
          <strong>{abaixoMinimo}</strong>
          <p>produtos precisando reposição.</p>
        </article>
        <article className="card">
          <span>Baixas registradas</span>
          <strong>{totalBaixas}</strong>
          <p>unidades retiradas recentemente.</p>
        </article>
      </section>
    </EstoqueLayout>
  );
}

export default function Page() {
  return (
    <RotaPrivada>
      <Metricas />
    </RotaPrivada>
  );
}
