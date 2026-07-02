import { validate } from 'deep-email-validator';

// mensagens amigáveis por tipo de falha
const MOTIVOS = {
  regex: 'formato inválido.',
  typo: 'parece ter um erro de digitação.',
  disposable: 'e-mails temporários/descartáveis não são aceitos.',
  mx: 'o domínio não recebe e-mails (não existe).',
  smtp: 'a caixa de e-mail não foi encontrada.',
};

// valida formato + domínio real (registros MX) + descartável + typo.
// NÃO faz a checagem SMTP (lenta e bloqueada por muitos servidores).
export async function validarEmailReal(email) {
  const res = await validate({ email, validateSMTP: false });
  if (res.valid) return;
  const motivo = MOTIVOS[res.reason] ?? 'e-mail inválido.';
  const erro = new Error(`E-mail inválido: ${motivo}`);
  erro.statusCode = 400;
  throw erro;
}
