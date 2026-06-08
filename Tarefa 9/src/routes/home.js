export default async function homeRoutes(app) {
  app.get('/', {
    schema: {
      tags: ['status'],
      summary: 'Verifica se a API esta funcionando',
      response: {
        200: {
          type: 'object',
          properties: {
            mensagem: { type: 'string' },
          },
        },
      },
    },
  }, async () => ({
    mensagem: 'API de filmes funcionando!',
  }));
}
