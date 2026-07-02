import { z } from 'zod';

// Admin cria o convite
export const criarConviteSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  papel: z.enum(['ADMIN', 'OPERADOR']).default('OPERADOR'),
});

// convidado conclui o cadastro pelo link
export const aceitarConviteSchema = z.object({
  nome: z.string().min(2, 'Informe o nome.'),
  senha: z.string().min(4, 'Mínimo 4 caracteres.'),
});
