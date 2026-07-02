import {
  resumo, maisMovimentados, porCategoria, baixoEstoque, movimentacoesPorDia,
} from '../services/relatorioService.js';
import { previsaoRuptura } from '../services/inteligenciaService.js';

export default async function relatoriosRoutes(app) {
  // opções padrão: exige permissão de ver relatório (ABAC) + tag no Swagger
  const ver = (summary) => ({
    preHandler: [app.autorizar('relatorio:ver')],
    schema: { tags: ['relatorios'], summary, security: [{ bearerAuth: [] }] },
  });

  app.get('/relatorios/resumo',            ver('KPIs gerais'),               async () => resumo(app.prisma));
  app.get('/relatorios/mais-movimentados', ver('Produtos mais baixados'),    async () => maisMovimentados(app.prisma));
  app.get('/relatorios/por-categoria',     ver('Quantidade por categoria'),  async () => porCategoria(app.prisma));
  app.get('/relatorios/baixo-estoque',     ver('Itens no/abaixo do mínimo'), async () => baixoEstoque(app.prisma));
  app.get('/relatorios/movimentacoes',     ver('Consumo por dia'),           async () => movimentacoesPorDia(app.prisma));
  app.get('/relatorios/previsao',          ver('Previsão de ruptura'),       async () => previsaoRuptura(app.prisma));
}
