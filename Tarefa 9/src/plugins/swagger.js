import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

export default async function swaggerPlugin(app) {
  await app.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Tarefa 9 - API de Filmes',
        description: 'API REST com Node.js, Fastify, hooks, schemas e consumo de API externa.',
        version: '1.0.0',
      },
      tags: [
        { name: 'status', description: 'Verificacao da API' },
        { name: 'filmes', description: 'Rotas de filmes e busca' },
      ],
    },
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
  });
}
