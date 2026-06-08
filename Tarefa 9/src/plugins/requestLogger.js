export default async function requestLogger(app) {
  app.addHook('onRequest', async (request) => {
    const horario = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'medium',
      timeZone: 'America/Sao_Paulo',
    }).format(new Date());

    app.log.info({
      metodo: request.method,
      url: request.url,
      horario,
    }, 'Requisicao recebida');
  });
}
