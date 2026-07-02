import { z } from 'zod';

export const criarProdutoSchema = z.object({
  nome: z.string().min(2, 'Informe o nome do produto.'),
  categoria: z.string().min(2, 'Informe a categoria.'),
  quantidade: z.coerce.number().int('Use um inteiro.').min(0, 'Não pode ser negativo.'),
  minimo: z.coerce.number().int('Use um inteiro.').min(0, 'Não pode ser negativo.'),
});

// na atualização todos os campos são opcionais
export const atualizarProdutoSchema = criarProdutoSchema.partial();

// parâmetros da listagem de produtos (vêm da query string)
export const listarProdutosQuerySchema = z.object({
  pagina:     z.coerce.number().int().min(1).default(1),
  limite:     z.coerce.number().int().min(1).max(100).default(10),
  q:          z.string().trim().optional(),          // busca por nome
  categoria:  z.string().trim().optional(),          // filtro exato
  ordenarPor: z.enum(['nome', 'categoria', 'quantidade', 'criadoEm']).default('nome'),
  ordem:      z.enum(['asc', 'desc']).default('asc'),
});
