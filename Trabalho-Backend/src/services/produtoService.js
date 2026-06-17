export async function listarProdutos(prisma) {
  return prisma.produto.findMany({ orderBy: { id: 'asc' } });
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
  await prisma.produto.delete({ where: { id } });
}
