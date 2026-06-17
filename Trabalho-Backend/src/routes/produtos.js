import { criarProdutoSchema, atualizarProdutoSchema } from '../schemas/produto.js';
import {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  removerProduto,
} from '../services/produtoService.js';

export default async function produtosRoutes(app) {
  // LISTAR (público)
  app.get('/produtos', {
    schema: { tags: ['produtos'], summary: 'Lista os produtos' },
  }, async () => listarProdutos(app.prisma));

  // DETALHAR (público)
  app.get('/produtos/:id', {
    schema: { tags: ['produtos'], summary: 'Detalha um produto' },
  }, async (request) => buscarProduto(app.prisma, Number(request.params.id)));

  // CRIAR (privado)
  app.post('/produtos', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['produtos'],
      summary: 'Cria um produto (requer login)',
      security: [{ bearerAuth: [] }],
    },
  }, async (request, reply) => {
    const dados = criarProdutoSchema.parse(request.body);
    const produto = await criarProduto(app.prisma, dados);
    return reply.status(201).send(produto);
  });

  // ATUALIZAR (privado)
  app.put('/produtos/:id', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['produtos'],
      summary: 'Atualiza um produto (requer login)',
      security: [{ bearerAuth: [] }],
    },
  }, async (request) => {
    const dados = atualizarProdutoSchema.parse(request.body);
    return atualizarProduto(app.prisma, Number(request.params.id), dados);
  });

  // REMOVER (privado)
  app.delete('/produtos/:id', {
    preHandler: [app.authenticate],
    schema: {
      tags: ['produtos'],
      summary: 'Remove um produto (requer login)',
      security: [{ bearerAuth: [] }],
    },
  }, async (request, reply) => {
    await removerProduto(app.prisma, Number(request.params.id));
    return reply.status(204).send();
  });
}
