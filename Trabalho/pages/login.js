import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../src/context/AuthContext.js';

function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function aoEnviar(event) {
    event.preventDefault();
    const resultado = login(email, senha);
    if (resultado.ok) {
      // logou: manda direto pro admin
      router.push('/admin');
    } else {
      setErro(resultado.erro);
    }
  }

  return (
    <main className="app-shell">
      <section className="form-card">
        <p className="eyebrow">Acesso</p>
        <h1>Login</h1>
        <p>Entre com seu e-mail e senha para acessar a área administrativa.</p>

        {erro && <div className="form-error">{erro}</div>}

        <form onSubmit={aoEnviar}>
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
            Senha
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </label>
          <button className="button button--primary" type="submit">
            Entrar
          </button>
        </form>

        <p className="form-help">
          Não tem conta? <Link href="/cadastro">Cadastre-se</Link>
        </p>
        <p className="form-help">
          Acesso de teste: <strong>admin@estoque.com</strong> / <strong>123456</strong>
        </p>
      </section>
    </main>
  );
}

export default Login;
