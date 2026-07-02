import cron from 'node-cron';
import { resumo, baixoEstoque } from '../services/relatorioService.js';
import { enviarEmail } from '../services/mailer.js';

let tarefa = null; // guarda a tarefa agendada para poder trocar/parar

// monta o balanço do dia e envia a todos os admins
export async function rodarBalancoDiario(app) {
  const r = await resumo(app.prisma);
  const baixos = await baixoEstoque(app.prisma);
  const inicioDoDia = new Date();
  inicioDoDia.setHours(0, 0, 0, 0);
  const baixasHoje = await app.prisma.baixa.count({ where: { data: { gte: inicioDoDia } } });

  const admins = await app.prisma.usuario.findMany({
    where: { papel: { in: ['ADMIN', 'SUPER_ADMIN'] } },
    select: { email: true },
  });
  if (admins.length === 0) return;

  const listaBaixos =
    baixos.map((p) => `<li>${p.nome}: ${p.quantidade} (mín. ${p.minimo})</li>`).join('') ||
    '<li>nenhum</li>';
  const html = `<h2>Balanço do dia — Estoque+</h2>
    <ul>
      <li>Produtos cadastrados: ${r.totalProdutos}</li>
      <li>Itens em estoque: ${r.itensEmEstoque}</li>
      <li>Baixas hoje: ${baixasHoje}</li>
      <li>Itens abaixo do mínimo: ${r.abaixoDoMinimo}</li>
    </ul>
    <h3>Precisam de reposição</h3><ul>${listaBaixos}</ul>`;

  await enviarEmail({
    para: admins.map((a) => a.email).join(','),
    assunto: 'Balanço diário do estoque',
    html,
  });
  app.log.info(`Balanço diário enviado a ${admins.length} admin(s).`);
}

// (re)agenda a rotina com uma expressão cron
export function agendarBalanco(app, expr) {
  if (tarefa) tarefa.stop();
  tarefa = cron.schedule(expr, () => rodarBalancoDiario(app).catch((e) => app.log.error(e)));
  app.log.info(`Balanço diário agendado: ${expr}`);
}

export function pararBalanco() {
  if (tarefa) {
    tarefa.stop();
    tarefa = null;
  }
}

// plugin: ao subir, lê a config e agenda se estiver ativa
export default async function jobsPlugin(app) {
  if (process.env.NODE_ENV === 'test') return;
  const cfg = await app.prisma.rotinaConfig.findUnique({ where: { id: 1 } });
  if (cfg?.ativo) agendarBalanco(app, cfg.cron);
}
