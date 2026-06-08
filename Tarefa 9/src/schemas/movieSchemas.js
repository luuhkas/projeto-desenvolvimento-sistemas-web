export function registerMovieSchemas(app) {
  app.addSchema({
    $id: 'filmeResumo',
    type: 'object',
    properties: {
      id: { type: 'string' },
      titulo: { type: 'string' },
      tituloOriginal: { type: 'string' },
      diretor: { type: 'string' },
      anoLancamento: { type: 'string' },
      nota: { type: 'string' },
    },
  });

  app.addSchema({
    $id: 'filmeDetalhe',
    type: 'object',
    properties: {
      id: { type: 'string' },
      titulo: { type: 'string' },
      tituloOriginal: { type: 'string' },
      descricao: { type: 'string' },
      diretor: { type: 'string' },
      produtor: { type: 'string' },
      anoLancamento: { type: 'string' },
      duracao: { type: 'string' },
      nota: { type: 'string' },
    },
  });
}
