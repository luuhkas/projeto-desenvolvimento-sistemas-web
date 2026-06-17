import { z } from 'zod';

export const criarBaixaSchema = z.object({
  produtoId: z.coerce.number().int('Use um inteiro.').positive('Produto inválido.'),
  quantidade: z.coerce.number().int('Use um inteiro.').positive('A quantidade deve ser maior que zero.'),
});
