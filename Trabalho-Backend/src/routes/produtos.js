import { criarProdutoSchema, atualizarProdutoSchema, listarProdutosQuerySchema } from '../schemas/produto.js';
import {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  removerProduto,
} from '../services/produtoService.js';

export default async function produtosRoutes(app) {
  // LISTAR (público) — paginado, com filtro e ordenação
  app.get('/produtos', {
    schema: { tags: ['produtos'], summary: 'Lista produtos (paginado, com filtro e ordenação)' },
  }, async (request) => {
    const opcoes = listarProdutosQuerySchema.parse(request.query);
    return listarProdutos(app.prisma, opcoes);
  });

  // DETALHAR (público)
  app.get('/produtos/:id', {
    schema: { tags: ['produtos'], summary: 'Detalha um produto' },
  }, async (request) => buscarProduto(app.prisma, Number(request.params.id)));

  // CRIAR (Admin / Super Admin)
  app.post('/produtos', {
    preHandler: [app.autorizar('produto:criar')],
    schema: {
      tags: ['produtos'],
      summary: 'Cria um produto (requer login)',
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          categoria: { type: 'string' },
          quantidade: { type: 'integer' },
          minimo: { type: 'integer' },
        },
      },
    },
  }, async (request, reply) => {
    const dados = criarProdutoSchema.parse(request.body);
    const produto = await criarProduto(app.prisma, dados);
    return reply.status(201).send(produto);
  });

  // ATUALIZAR (Admin / Super Admin)
  app.put('/produtos/:id', {
    preHandler: [app.autorizar('produto:editar')],
    schema: {
      tags: ['produtos'],
      summary: 'Atualiza um produto (requer login)',
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          categoria: { type: 'string' },
          quantidade: { type: 'integer' },
          minimo: { type: 'integer' },
        },
      },
    },
  }, async (request) => {
    const dados = atualizarProdutoSchema.parse(request.body);
    return atualizarProduto(app.prisma, Number(request.params.id), dados);
  });

  // REMOVER (só Super Admin)
  app.delete('/produtos/:id', {
    preHandler: [app.autorizar('produto:remover')],
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
