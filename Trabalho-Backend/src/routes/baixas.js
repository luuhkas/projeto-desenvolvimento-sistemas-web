import { criarBaixaSchema } from '../schemas/baixa.js';
import { listarBaixas, registrarBaixa } from '../services/baixaService.js';

export default async function baixasRoutes(app) {
  // LISTAR (público)
  app.get('/baixas', {
    schema: { tags: ['baixas'], summary: 'Lista as baixas registradas' },
  }, async () => listarBaixas(app.prisma));

  // REGISTRAR (privado) — desconta do estoque
  app.post('/baixas', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['baixas'],
      summary: 'Registra uma baixa e desconta do estoque (requer login)',
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        properties: {
          produtoId: { type: 'integer' },
          quantidade: { type: 'integer' },
        },
      },
    },
  }, async (request, reply) => {
    const dados = criarBaixaSchema.parse(request.body);
    // o responsável vem do usuário logado (do token)
    const baixa = await registrarBaixa(app.prisma, {
      ...dados,
      responsavel: request.user.email,
    });
    return reply.status(201).send(baixa);
  });
}
