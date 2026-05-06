import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usuariosMock } from '../../src/data/usuarios.js';

function DetalhesUsuario() {
  const router = useRouter();
  const { id } = router.query;
  const [usuario, setUsuario] = useState(null);
  const [buscaFinalizada, setBuscaFinalizada] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return undefined;
    }

    console.log(`Buscando usuario com ID ${id}`);

    const usuarioEncontrado = usuariosMock.find((item) => String(item.id) === String(id));

    setUsuario(usuarioEncontrado || null);
    setBuscaFinalizada(true);

    return () => {
      console.log(`Saindo da pagina do usuario ${id}`);
    };
  }, [router.isReady, id]);

  return (
    <main className="app-shell">
      <section className="page-heading">
        <p className="eyebrow">Rota dinâmica</p>
        <h1>Detalhes do usuário</h1>
        <p>
          O ID vem da URL pela rota /usuarios/[id], depois o usuário é buscado no
          array mockado.
        </p>
      </section>

      {!buscaFinalizada ? (
        <p className="loading">Buscando usuário...</p>
      ) : usuario ? (
        <article className="detail-card">
          <span className="user-card__id">ID {usuario.id}</span>
          <h2>{usuario.nome}</h2>
          <dl>
            <div>
              <dt>Email</dt>
              <dd>{usuario.email}</dd>
            </div>
            <div>
              <dt>Cargo</dt>
              <dd>{usuario.cargo}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{usuario.status}</dd>
            </div>
          </dl>
        </article>
      ) : (
        <article className="detail-card">
          <h2>Usuário não encontrado</h2>
          <p>Não existe usuário cadastrado com o ID informado.</p>
        </article>
      )}

      <Link className="button button--back" href="/usuarios">
        Voltar para usuários
      </Link>
    </main>
  );
}

export default DetalhesUsuario;
