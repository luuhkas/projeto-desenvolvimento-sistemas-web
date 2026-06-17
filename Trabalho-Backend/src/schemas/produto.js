import { z } from 'zod';

export const criarProdutoSchema = z.object({
  nome: z.string().min(2, 'Informe o nome do produto.'),
  categoria: z.string().min(2, 'Informe a categoria.'),
  quantidade: z.coerce.number().int('Use um inteiro.').min(0, 'Não pode ser negativo.'),
  minimo: z.coerce.number().int('Use um inteiro.').min(0, 'Não pode ser negativo.'),
});

// na atualização todos os campos são opcionais
export const atualizarProdutoSchema = criarProdutoSchema.partial();
