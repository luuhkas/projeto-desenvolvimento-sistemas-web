import { z } from "zod";

// todos os formularios do sistema validam com estes schemas (Zod),
// integrados ao React Hook Form pelo @hookform/resolvers/zod

export const loginSchema = z.object({
  email: z.string().min(1, "Informe o e-mail.").email("E-mail inválido."),
  senha: z.string().min(4, "A senha precisa ter no mínimo 4 caracteres."),
});

export const cadastroSchema = z
  .object({
    nome: z.string().min(2, "Informe seu nome."),
    email: z.string().min(1, "Informe o e-mail.").email("E-mail inválido."),
    senha: z.string().min(4, "A senha precisa ter no mínimo 4 caracteres."),
    confirmarSenha: z.string().min(1, "Confirme a senha."),
  })
  .refine((dados) => dados.senha === dados.confirmarSenha, {
    message: "As senhas não conferem.",
    path: ["confirmarSenha"],
  });

export const contatoSchema = z.object({
  nome: z.string().min(2, "Informe seu nome."),
  email: z.string().min(1, "Informe o e-mail.").email("E-mail inválido."),
  mensagem: z.string().min(5, "Escreva uma mensagem com pelo menos 5 caracteres."),
});

export const convidarSchema = z.object({
  email: z.string().min(1, "Informe o e-mail.").email("E-mail inválido."),
});

export const baixaSchema = z.object({
  produto: z.string().min(1, "Selecione um produto."),
  quantidade: z.coerce
    .number({ invalid_type_error: "Informe um número." })
    .int("Use um número inteiro.")
    .positive("A quantidade deve ser maior que zero."),
});

export const produtoSchema = z.object({
  nome: z.string().min(2, "Informe o nome do produto."),
  categoria: z.string().min(2, "Informe a categoria."),
  quantidade: z.coerce
    .number({ invalid_type_error: "Informe um número." })
    .int("Use um número inteiro.")
    .min(0, "Não pode ser negativo."),
  minimo: z.coerce
    .number({ invalid_type_error: "Informe um número." })
    .int("Use um número inteiro.")
    .min(0, "Não pode ser negativo."),
});
