import cron from 'node-cron';
import { rodarBalancoDiario, agendarBalanco, pararBalanco } from '../plugins/jobs.js';

export default async function backofficeRoutes(app) {
  // tudo aqui é exclusivo do Super Admin (ABAC backoffice:gerir)
  const so = {
    preHandler: [app.autorizar('backoffice:gerir')],
    schema: { tags: ['backoffice'], security: [{ bearerAuth: [] }] },
  };

  // config atual da rotina
  app.get('/backoffice/rotina', so, async () =>
    app.prisma.rotinaConfig.findUnique({ where: { id: 1 } }),
  );

  // muda horário/ativo e aplica na hora (reagenda ou para)
  app.put('/backoffice/rotina', so, async (request, reply) => {
    const { cron: expr, ativo } = request.body ?? {};
    if (expr && !cron.validate(expr)) {
      return reply.status(400).send({ erro: 'Expressão cron inválida.' });
    }
    const cfg = await app.prisma.rotinaConfig.update({
      where: { id: 1 },
      data: { ...(expr && { cron: expr }), ...(ativo !== undefined && { ativo }) },
    });
    if (cfg.ativo) agendarBalanco(app, cfg.cron);
    else pararBalanco();
    return cfg;
  });

  // dispara o balanço agora (botão de teste)
  app.post('/backoffice/rotina/disparar', so, async () => {
    await rodarBalancoDiario(app);
    return { mensagem: 'Balanço disparado.' };
  });

  // log de e-mails enviados (lê do microserviço de e-mail)
  app.get('/backoffice/emails', so, async () => {
    const url = process.env.EMAIL_SERVICE_URL ?? 'http://localhost:8000';
    const r = await fetch(`${url}/emails`);
    return r.json();
  });
}
