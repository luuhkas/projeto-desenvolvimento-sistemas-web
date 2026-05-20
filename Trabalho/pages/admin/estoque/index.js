import RotaPrivada from '../../../src/components/RotaPrivada.js';
import EstoqueLayout from '../../../src/components/EstoqueLayout.js';
import { produtosMock } from '../../../src/data/estoque.js';

function Visualizacao() {
  return (
    <EstoqueLayout>
      <section className="page-heading">
        <p className="eyebrow">Estoque</p>
        <h1>Visualização</h1>
        <p>Produtos cadastrados e quantidades disponíveis.</p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Mínimo</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {produtosMock.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.categoria}</td>
                <td>{p.quantidade}</td>
                <td>{p.minimo}</td>
                <td className={p.quantidade < p.minimo ? 'status-alerta' : 'status-ok'}>
                  {p.quantidade < p.minimo ? 'Abaixo do mínimo' : 'OK'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </EstoqueLayout>
  );
}

export default function Page() {
  return (
    <RotaPrivada>
      <Visualizacao />
    </RotaPrivada>
  );
}
