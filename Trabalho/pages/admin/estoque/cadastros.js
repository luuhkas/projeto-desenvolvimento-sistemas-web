import { useState } from 'react';
import RotaPrivada from '../../../src/components/RotaPrivada.js';
import EstoqueLayout from '../../../src/components/EstoqueLayout.js';
import { produtosMock } from '../../../src/data/estoque.js';

function Cadastros() {
  const [produtos, setProdutos] = useState(produtosMock);
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [minimo, setMinimo] = useState(0);

  function aoCadastrar(event) {
    event.preventDefault();
    // input number ainda volta string, por isso o Number() na quantidade e minimo
    setProdutos([
      ...produtos,
      { id: Date.now(), nome, categoria, quantidade: Number(quantidade), minimo: Number(minimo) },
    ]);
    setNome('');
    setCategoria('');
    setQuantidade(0);
    setMinimo(0);
  }

  return (
    <EstoqueLayout>
      <section className="page-heading">
        <p className="eyebrow">Estoque</p>
        <h1>Cadastros</h1>
        <p>Cadastre novos produtos no catálogo do estoque.</p>

        <form onSubmit={aoCadastrar} className="form-stack">
          <input
            className="field"
            type="text"
            placeholder="Nome do produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            className="field"
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
          <div className="form-row">
            <input
              className="field"
              type="number"
              placeholder="Quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />
            <input
              className="field"
              type="number"
              placeholder="Estoque mínimo"
              value={minimo}
              onChange={(e) => setMinimo(e.target.value)}
              required
            />
          </div>
          <button className="button button--primary" type="submit">Cadastrar produto</button>
        </form>

        <table className="data-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Mínimo</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.categoria}</td>
                <td>{p.quantidade}</td>
                <td>{p.minimo}</td>
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
      <Cadastros />
    </RotaPrivada>
  );
}
