import { useState } from 'react';

function Contato() {
  const [enviado, setEnviado] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  function aoEnviar(event) {
    event.preventDefault();
    setEnviado(true);
    setNome('');
    setEmail('');
    setMensagem('');
  }

  return (
    <main className="app-shell">
      <section className="form-card">
        <p className="eyebrow">Contato</p>
        <h1>Fale conosco</h1>
        <p>Envie sua dúvida, sugestão ou solicitação de acesso ao sistema.</p>

        {enviado && <div className="form-success">Mensagem enviada com sucesso.</div>}

        <form onSubmit={aoEnviar}>
          <label>
            Nome
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </label>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Mensagem
            <input
              type="text"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
            />
          </label>
          <button className="button button--primary" type="submit">
            Enviar
          </button>
        </form>
      </section>
    </main>
  );
}

export default Contato;
