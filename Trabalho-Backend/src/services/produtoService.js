export async function listarProdutos(prisma, opcoes = {}) {
  const { pagina = 1, limite = 10, q, categoria,
          ordenarPor = 'nome', ordem = 'asc' } = opcoes;

  // monta o filtro dinamicamente: só inclui o que veio
  const where = {};
  if (q)         where.nome = { contains: q };   // LIKE (case-insensitive no SQLite)
  if (categoria) where.categoria = categoria;

  // busca a página + conta o total, na mesma transação
  const [dados, total] = await prisma.$transaction([
    prisma.produto.findMany({
      where,
      orderBy: { [ordenarPor]: ordem },
      skip: (pagina - 1) * limite,
      take: limite,
    }),
    prisma.produto.count({ where }),
  ]);

  return { dados, total, pagina, limite, paginas: Math.ceil(total / limite) };
}

export async function buscarProduto(prisma, id) {
  const produto = await prisma.produto.findUnique({ where: { id } });
  if (!produto) {
    const erro = new Error('Produto não encontrado.');
    erro.statusCode = 404;
    throw erro;
  }
  return produto;
}

export async function criarProduto(prisma, dados) {
  return prisma.produto.create({ data: dados });
}

export async function atualizarProduto(prisma, id, dados) {
  await buscarProduto(prisma, id); // 404 se não existir
  return prisma.produto.update({ where: { id }, data: dados });
}

export async function removerProduto(prisma, id) {
  await buscarProduto(prisma, id); // 404 se não existir

  // não deixa apagar produto com histórico de baixas: esses dados alimentam a
  // inteligência de estoque (consumo, mais movimentados, previsão de ruptura),
  // então bloqueia com um 409 claro em vez de estourar erro de integridade.
  const baixas = await prisma.baixa.count({ where: { produtoId: id } });
  if (baixas > 0) {
    const erro = new Error('Não é possível excluir um produto com baixas registradas.');
    erro.statusCode = 409;
    throw erro;
  }

  await prisma.produto.delete({ where: { id } });
}
