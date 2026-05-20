import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext.js';

function RotaPrivada({ children }) {
  const { usuario, carregando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!carregando && !usuario) {
      // replace pra nao deixar o botao voltar do navegador
      // levar de volta pra rota privada
      router.replace('/login');
    }
  }, [carregando, usuario, router]);

  // enquanto verifica nao mostra o conteudo, evita piscar a tela
  if (carregando || !usuario) {
    return (
      <main className="app-shell">
        <p className="loading">Verificando acesso...</p>
      </main>
    );
  }

  return children;
}

export default RotaPrivada;
