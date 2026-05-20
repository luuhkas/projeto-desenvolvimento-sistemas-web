import { useState } from 'react';
import RotaPrivada from '../../../src/components/RotaPrivada.js';
import EstoqueLayout from '../../../src/components/EstoqueLayout.js';
import { produtosMock, baixasMock } from '../../../src/data/estoque.js';

function Relatorios() {
  const [tipo, setTipo] = useState('estoque');

  const ehEstoque = tipo === 'estoque';

  return (
    <EstoqueLayout>
      <section className="page-heading">
        <p className="eyebrow">Estoque</p>
        <h1>Relatórios</h1>
        <p>Gere relatórios consolidados do sistema.</p>

        <div className="subnav">
          <button
            className={ehEstoque ? 'nav__link nav__link--active' : 'nav__link'}
            onClick={() => setTipo('estoque')}
            type="button"
          >
            Posição de estoque
          </button>
          <button
            className={!ehEstoque ? 'nav__link nav__link--active' : 'nav__link'}
            onClick={() => setTipo('baixas')}
            type="button"
          >
            Histórico de baixas
          </button>
        </div>

        {ehEstoque ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {produtosMock.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.categoria}</td>
                  <td>{p.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Responsável</th>
              </tr>
            </thead>
            <tbody>
              {baixasMock.map((b) => (
                <tr key={b.id}>
                  <td>{b.data}</td>
                  <td>{b.produto}</td>
                  <td>{b.quantidade}</td>
                  <td>{b.responsavel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </EstoqueLayout>
  );
}

export default function Page() {
  return (
    <RotaPrivada>
      <Relatorios />
    </RotaPrivada>
  );
}
