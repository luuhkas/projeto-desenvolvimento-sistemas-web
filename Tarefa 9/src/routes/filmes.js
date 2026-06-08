import { listarFilmes, buscarFilmesPorTitulo, detalharFilme } from '../services/ghibliApi.js';

export default async function filmesRoutes(app) {
  app.get('/filmes', {
    schema: {
      tags: ['filmes'],
      summary: 'Lista filmes da API publica',
      response: {
        200: {
          type: 'array',
          items: { $ref: 'filmeResumo#' },
        },
      },
    },
  }, async () => listarFilmes());

  app.get('/filmes/:id', {
    schema: {
      tags: ['filmes'],
      summary: 'Busca detalhes de um filme pelo ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        200: { $ref: 'filmeDetalhe#' },
      },
    },
  }, async (request) => {
    const filme = await detalharFilme(request.params.id);

    if (!filme) {
      throw app.httpErrors.notFound('Filme nao encontrado.');
    }

    return filme;
  });

  app.get('/busca', {
    schema: {
      tags: ['filmes'],
      summary: 'Pesquisa filmes pelo titulo',
      querystring: {
        type: 'object',
        required: ['q'],
        properties: {
          q: { type: 'string', minLength: 1 },
        },
      },
      response: {
        200: {
          type: 'array',
          items: { $ref: 'filmeResumo#' },
        },
      },
    },
  }, async (request) => buscarFilmesPorTitulo(request.query.q));
}
