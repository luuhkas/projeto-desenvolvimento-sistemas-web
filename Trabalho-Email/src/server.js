import 'dotenv/config';
import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { transporter } from './mailer.js';

const prisma = new PrismaClient();
const app = Fastify({ logger: true });

// POST /emails — envia o e-mail e registra no log
app.post('/emails', async (request, reply) => {
  const { para, assunto, html } = request.body ?? {};
  if (!para || !assunto || !html) {
    return reply.status(400).send({ erro: 'Campos obrigatórios: para, assunto, html.' });
  }
  try {
    await transporter.sendMail({ from: process.env.MAIL_FROM, to: para, subject: assunto, html });
    const log = await prisma.email.create({ data: { para, assunto, corpo: html, status: 'enviado' } });
    return reply.status(201).send({ status: 'enviado', id: log.id });
  } catch (e) {
    await prisma.email.create({ data: { para, assunto, corpo: html, status: 'falhou', erro: e.message } });
    return reply.status(502).send({ status: 'falhou', erro: e.message });
  }
});

// GET /emails — log dos envios (o backoffice da Etapa 04 usa isto)
app.get('/emails', async () =>
  prisma.email.findMany({ orderBy: { id: 'desc' }, take: 100 })
);

const port = Number(process.env.PORT ?? 8000);
app
  .listen({ port, host: '0.0.0.0' })
  .then(() => console.log(`Servico de e-mail em http://localhost:${port}`))
  .catch((e) => {
    app.log.error(e);
    process.exit(1);
  });
