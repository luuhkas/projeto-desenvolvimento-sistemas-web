import { criarConviteSchema, aceitarConviteSchema } from '../schemas/convite.js';
import { criarConvite, buscarConviteValido, aceitarConvite } from '../services/conviteService.js';
import { enviarEmail } from '../services/mailer.js';
import { validarEmailReal } from '../services/emailValidator.js';

export default async function convitesRoutes(app) {
  // CRIAR convite (ABAC: convite:criar -> Admin/Super Admin)
  app.post('/convites', {
    preHandler: [app.autorizar('convite:criar')],
    schema: {
      tags: ['convites'],
      summary: 'Cria e envia um convite',
      security: [{ bearerAuth: [] }],
    },
  }, async (request, reply) => {
    const dados = criarConviteSchema.parse(request.body);
    await validarEmailReal(dados.email); // formato + domínio real (MX)
    const convite = await criarConvite(app.prisma, { ...dados, criadoPor: request.user.email });

    const link = `${process.env.APP_URL}/cadastro?token=${convite.token}`;
    await enviarEmail({
      para: convite.email,
      assunto: 'Você foi convidado para o Estoque+',
      html: `<p>Você foi convidado como <b>${convite.papel}</b>.</p>
             <p><a href="${link}">Clique para criar sua conta</a>.</p>`,
    });

    return reply.status(201).send({ mensagem: 'Convite enviado.', email: convite.email, link });
  });

  // VALIDAR convite (público) — a tela de cadastro usa para preencher o e-mail
  app.get('/convites/:token', {
    schema: { tags: ['convites'], summary: 'Valida um convite' },
  }, async (request) => {
    const c = await buscarConviteValido(app.prisma, request.params.token);
    return { email: c.email, papel: c.papel };
  });

  // ACEITAR convite (público) — cria o usuário e queima o convite
  app.post('/convites/:token/aceitar', {
    schema: { tags: ['convites'], summary: 'Conclui o cadastro pelo convite' },
  }, async (request, reply) => {
    const dados = aceitarConviteSchema.parse(request.body);
    const usuario = await aceitarConvite(app.prisma, { token: request.params.token, ...dados });
    return reply.status(201).send(usuario);
  });
}
