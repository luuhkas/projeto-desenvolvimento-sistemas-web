export async function listarBaixas(prisma) {
  return prisma.baixa.findMany({
    orderBy: { id: 'desc' },
    include: { produto: { select: { nome: true } } },
  });
}

// registra a baixa E desconta a quantidade do produto, numa transação,
// bloqueando se não houver estoque suficiente
export async function registrarBaixa(prisma, { produtoId, quantidade, responsavel }) {
  const produto = await prisma.produto.findUnique({ where: { id: produtoId } });
  if (!produto) {
    const erro = new Error('Produto não encontrado.');
    erro.statusCode = 404;
    throw erro;
  }
  if (quantidade > produto.quantidade) {
    const erro = new Error(`Estoque insuficiente: há apenas ${produto.quantidade} em estoque.`);
    erro.statusCode = 400;
    throw erro;
  }

  const [, baixa] = await prisma.$transaction([
    prisma.produto.update({
      where: { id: produtoId },
      data: { quantidade: { decrement: quantidade } },
    }),
    prisma.baixa.create({ data: { produtoId, quantidade, responsavel } }),
  ]);
  return baixa;
}
