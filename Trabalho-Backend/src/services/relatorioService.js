// KPIs gerais do sistema
export async function resumo(prisma) {
  const totalProdutos = await prisma.produto.count();
  const agg = await prisma.produto.aggregate({ _sum: { quantidade: true } });
  const totalBaixas = await prisma.baixa.count();
  // quantidade <= minimo compara 2 colunas -> SQL puro
  const baixo = await prisma.$queryRaw`SELECT COUNT(*) AS n FROM Produto WHERE quantidade <= minimo`;
  return {
    totalProdutos,
    itensEmEstoque: agg._sum.quantidade ?? 0,
    totalBaixas,
    abaixoDoMinimo: Number(baixo[0].n), // COUNT vem como BigInt -> Number
  };
}

// produtos mais movimentados (mais baixados)
export async function maisMovimentados(prisma, limite = 5) {
  const grupos = await prisma.baixa.groupBy({
    by: ['produtoId'],
    _sum: { quantidade: true },
    orderBy: { _sum: { quantidade: 'desc' } },
    take: limite,
  });
  const produtos = await prisma.produto.findMany({
    where: { id: { in: grupos.map((g) => g.produtoId) } },
    select: { id: true, nome: true },
  });
  const nomes = Object.fromEntries(produtos.map((p) => [p.id, p.nome]));
  return grupos.map((g) => ({ nome: nomes[g.produtoId], totalBaixado: g._sum.quantidade ?? 0 }));
}

// quantidade total por categoria
export async function porCategoria(prisma) {
  const grupos = await prisma.produto.groupBy({ by: ['categoria'], _sum: { quantidade: true } });
  return grupos.map((g) => ({ categoria: g.categoria, quantidade: g._sum.quantidade ?? 0 }));
}

// itens no/abaixo do mínimo (mais urgentes primeiro)
export async function baixoEstoque(prisma) {
  const linhas = await prisma.$queryRaw`
    SELECT id, nome, categoria, quantidade, minimo
    FROM Produto WHERE quantidade <= minimo
    ORDER BY (quantidade - minimo) ASC`;
  return linhas.map((l) => ({
    id: Number(l.id), nome: l.nome, categoria: l.categoria,
    quantidade: Number(l.quantidade), minimo: Number(l.minimo),
  }));
}

// consumo (baixas) por dia nos últimos N dias.
// Gotcha: o Prisma guarda DateTime como INTEGER (ms epoch) no SQLite, então
// converto com /1000 + 'unixepoch' e comparo em milissegundos.
export async function movimentacoesPorDia(prisma, dias = 30) {
  const linhas = await prisma.$queryRaw`
    SELECT strftime('%Y-%m-%d', data / 1000, 'unixepoch') AS dia, SUM(quantidade) AS total
    FROM Baixa
    WHERE data >= (strftime('%s', 'now', '-' || ${dias} || ' days') * 1000)
    GROUP BY dia ORDER BY dia ASC`;
  return linhas.map((l) => ({ dia: l.dia, total: Number(l.total) }));
}
