import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usuariosMock } from '../../src/data/usuarios.js';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    console.log('Carregando lista de usuarios');

    const timer = setTimeout(() => {
      setUsuarios(usuariosMock);
      setCarregando(false);
    }, 350);

    return () => {
      clearTimeout(timer);
      console.log('Saindo da pagina de usuarios');
    };
  }, []);

  return (
    <main className="app-shell">
      <section className="page-heading">
        <p className="eyebrow">useState e useEffect</p>
        <h1>Lista de usuários</h1>
        <p>
          Os dados abaixo são mockados no código e carregados ao abrir a página,
          simulando a busca de registros em um sistema.
        </p>
      </section>

      {carregando ? (
        <p className="loading">Carregando usuários...</p>
      ) : (
        <section className="user-grid" aria-label="Lista de usuários cadastrados">
          {usuarios.map((usuario) => (
            <article className="user-card" key={usuario.id}>
              <span className="user-card__id">ID {usuario.id}</span>
              <h2>{usuario.nome}</h2>
              <p>{usuario.email}</p>
              <Link className="button button--small" href={`/usuarios/${usuario.id}`}>
                Ver detalhes
              </Link>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Usuarios;
