import Link from 'next/link';
import RotaPrivada from '../../src/components/RotaPrivada.js';
import { useAuth } from '../../src/context/AuthContext.js';
import { produtosMock, baixasMock } from '../../src/data/estoque.js';

function Dashboard() {
  const { usuario } = useAuth();

  // reduce soma todas as quantidades, filter pega so os que estao em alerta
  const totalItens = produtosMock.reduce((acc, p) => acc + p.quantidade, 0);
  const abaixoMinimo = produtosMock.filter((p) => p.quantidade < p.minimo).length;
  const baixasHoje = baixasMock.length;

  return (
    <main className="app-shell">
      <section className="page-heading">
        <p className="eyebrow">Área restrita</p>
        <h1>Dashboard</h1>
        <p>Bem-vindo, {usuario?.nome}. Visão geral do sistema de estoque.</p>
      </section>

      <section className="card-grid">
        <article className="card">
          <span>Produtos</span>
          <strong>{produtosMock.length}</strong>
          <p>itens cadastrados no catálogo.</p>
        </article>
        <article className="card">
          <span>Estoque total</span>
          <strong>{totalItens}</strong>
          <p>unidades disponíveis somadas.</p>
        </article>
        <article className="card">
          <span>Alertas</span>
          <strong>{abaixoMinimo}</strong>
          <p>produtos abaixo do estoque mínimo.</p>
        </article>
        <article className="card">
          <span>Baixas</span>
          <strong>{baixasHoje}</strong>
          <p>baixas registradas recentemente.</p>
        </article>
      </section>

      <section className="page-heading shortcuts">
        <h2>Atalhos</h2>
        <div className="hero__actions">
          <Link className="button" href="/admin/usuarios">Gerenciar usuários</Link>
          <Link className="button" href="/admin/convidar">Convidar usuário</Link>
          <Link className="button button--primary" href="/admin/estoque">Ir para o estoque</Link>
        </div>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <RotaPrivada>
      <Dashboard />
    </RotaPrivada>
  );
}
