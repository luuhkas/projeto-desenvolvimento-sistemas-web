import { z } from 'zod';

export const registerSchema = z.object({
    nome: z.string().min(2, 'Informe o nome (mínimo 2 caracteres).'),
    email: z.string().email('E-mail inválido.'),
    senha: z.string().min(4, 'A senha precisa ter no mínimo 4 caracteres.'),
});

export const loginSchema = z.object({
    email: z.string().email('E-mail inválido.'),
    senha: z.string().min(1, 'Informe a senha.'),
});