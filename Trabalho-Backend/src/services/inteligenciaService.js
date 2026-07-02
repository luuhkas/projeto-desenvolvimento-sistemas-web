// estima, por produto, em quantos dias o estoque acaba, com base no
// consumo médio diário dos últimos `janelaDias`.
export async function previsaoRuptura(prisma, { janelaDias = 30, alertaDias = 7 } = {}) {
  const desde = new Date(Date.now() - janelaDias * 24 * 60 * 60 * 1000);

  // total baixado por produto na janela
  const consumo = await prisma.baixa.groupBy({
    by: ['produtoId'],
    _sum: { quantidade: true },
    where: { data: { gte: desde } },
  });
  const mapa = Object.fromEntries(consumo.map((c) => [c.produtoId, c._sum.quantidade ?? 0]));

  const produtos = await prisma.produto.findMany();
  return produtos
    .map((p) => {
      const consumoDiario = (mapa[p.id] ?? 0) / janelaDias;
      const diasRestantes = consumoDiario > 0 ? Math.floor(p.quantidade / consumoDiario) : null;
      let status = 'ok';
      if (p.quantidade <= p.minimo) status = 'critico';
      else if (diasRestantes !== null && diasRestantes <= alertaDias) status = 'alerta';
      return {
        id: p.id, nome: p.nome, quantidade: p.quantidade, minimo: p.minimo,
        consumoDiario: Number(consumoDiario.toFixed(2)), diasRestantes, status,
      };
    })
    .sort((a, b) => (a.diasRestantes ?? 9999) - (b.diasRestantes ?? 9999));
}
