const EMAIL_URL = process.env.EMAIL_SERVICE_URL ?? 'http://localhost:8000';

// chama o microserviço de e-mail (porta 8000). Node 18+ já tem fetch global.
// Se o serviço estiver fora, NÃO derruba o fluxo — só registra a falha.
export async function enviarEmail({ para, assunto, html }) {
  try {
    const r = await fetch(`${EMAIL_URL}/emails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ para, assunto, html }),
    });
    const dados = await r.json().catch(() => null);
    if (!r.ok) throw new Error(dados?.erro ?? `Serviço de e-mail respondeu ${r.status}`);
    return dados;
  } catch (e) {
    console.error('Falha ao enviar e-mail:', e.message);
    return { status: 'falhou', erro: e.message };
  }
}
