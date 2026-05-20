import { useEffect, useState } from 'react';
import RotaPrivada from '../../src/components/RotaPrivada.js';
import { useAuth } from '../../src/context/AuthContext.js';

function Usuarios() {
  const { listarUsuarios } = useAuth();
  const [usuarios, setUsuarios] = useState([]);

  // pega dentro do useEffect pq listarUsuarios mexe no localStorage
  // e isso da problema se rodar no server-side
  useEffect(() => {
    setUsuarios(listarUsuarios());
  }, [listarUsuarios]);

  return (
    <main className="app-shell">
      <section className="page-heading">
        <p className="eyebrow">Administração</p>
        <h1>Gerenciamento de usuários</h1>
        <p>Lista de usuários cadastrados no sistema.</p>

        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.email}>
                <td>{u.nome}</td>
                <td>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <RotaPrivada>
      <Usuarios />
    </RotaPrivada>
  );
}
