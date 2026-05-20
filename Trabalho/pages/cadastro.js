import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../src/context/AuthContext.js';

function Cadastro() {
  const router = useRouter();
  const { cadastrar, login } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function aoEnviar(event) {
    event.preventDefault();
    const resultado = cadastrar(nome, email, senha);
    if (!resultado.ok) {
      setErro(resultado.erro);
      return;
    }
    // depois de cadastrar ja faz login automatico
    // pra nao obrigar a digitar tudo de novo
    login(email, senha);
    router.push('/admin');
  }

  return (
    <main className="app-shell">
      <section className="form-card">
        <p className="eyebrow">Novo usuário</p>
        <h1>Cadastro</h1>
        <p>Crie sua conta para acessar o sistema.</p>

        {erro && <div className="form-error">{erro}</div>}

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
            Senha
            <input
              type="password"
              minLength={4}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </label>
          <button className="button button--primary" type="submit">
            Criar conta
          </button>
        </form>

        <p className="form-help">
          Já tem conta? <Link href="/login">Entrar</Link>
        </p>
      </section>
    </main>
  );
}

export default Cadastro;
