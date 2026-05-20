import { useState } from 'react';
import RotaPrivada from '../../src/components/RotaPrivada.js';

function Convidar() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  function aoEnviar(event) {
    event.preventDefault();
    setEnviado(true);
    setEmail('');
  }

  return (
    <main className="app-shell">
      <section className="form-card">
        <p className="eyebrow">Administração</p>
        <h1>Convidar usuário</h1>
        <p>Envie um convite por e-mail para um novo usuário do sistema.</p>

        {enviado && <div className="form-success">Convite enviado com sucesso.</div>}

        <form onSubmit={aoEnviar}>
          <label>
            E-mail do convidado
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button className="button button--primary" type="submit">
            Enviar convite
          </button>
        </form>
      </section>
    </main>
  );
}

export default function Page() {
  return (
    <RotaPrivada>
      <Convidar />
    </RotaPrivada>
  );
}
