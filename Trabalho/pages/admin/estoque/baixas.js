import { useState } from 'react';
import RotaPrivada from '../../../src/components/RotaPrivada.js';
import EstoqueLayout from '../../../src/components/EstoqueLayout.js';
import { baixasMock, produtosMock } from '../../../src/data/estoque.js';

function Baixas() {
  const [baixas, setBaixas] = useState(baixasMock);
  const [produto, setProduto] = useState(produtosMock[0].nome);
  const [quantidade, setQuantidade] = useState(1);

  function aoRegistrar(event) {
    event.preventDefault();
    const nova = {
      id: Date.now(),
      data: new Date().toISOString().slice(0, 10),
      produto,
      quantidade: Number(quantidade),
      responsavel: 'Usuário logado',
    };
    // criando array novo no setBaixas pq o React nao
    // detecta mudanca se eu mexer no array antigo direto
    setBaixas([nova, ...baixas]);
    setQuantidade(1);
  }

  return (
    <EstoqueLayout>
      <section className="page-heading">
        <p className="eyebrow">Estoque</p>
        <h1>Baixas</h1>
        <p>Registre saídas de produtos do estoque.</p>

        <form onSubmit={aoRegistrar} className="form-row">
          <select
            className="field"
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
          >
            {produtosMock.map((p) => (
              <option key={p.id} value={p.nome}>{p.nome}</option>
            ))}
          </select>
          <input
            className="field"
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <button className="button button--primary" type="submit">Registrar baixa</button>
        </form>

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
            {baixas.map((b) => (
              <tr key={b.id}>
                <td>{b.data}</td>
                <td>{b.produto}</td>
                <td>{b.quantidade}</td>
                <td>{b.responsavel}</td>
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
      <Baixas />
    </RotaPrivada>
  );
}
