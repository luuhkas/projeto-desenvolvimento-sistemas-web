export async function listarBaixas(prisma) {
  return prisma.baixa.findMany({
    orderBy: { id: 'desc' },
    include: { produto: { select: { nome: true } } },
  });
}

// registra a baixa E desconta do estoque de forma ATÔMICA, numa transação.
// o desconto só acontece se houver saldo suficiente — sem condição de corrida.
export async function registrarBaixa(prisma, { produtoId, quantidade, responsavel }) {
  return prisma.$transaction(async (tx) => {
    // tenta descontar SÓ se a quantidade atual >= a pedida.
    // a condição no where + o decrement viram um passo único e indivisível.
    const resultado = await tx.produto.updateMany({
      where: { id: produtoId, quantidade: { gte: quantidade } },
      data: { quantidade: { decrement: quantidade } },
    });

    // count === 0 -> nada foi atualizado: ou não existe, ou faltou saldo.
    if (resultado.count === 0) {
      const produto = await tx.produto.findUnique({ where: { id: produtoId } });
      if (!produto) {
        const erro = new Error('Produto não encontrado.');
        erro.statusCode = 404;
        throw erro;
      }
      const erro = new Error(`Estoque insuficiente: há apenas ${produto.quantidade} em estoque.`);
      erro.statusCode = 409; // conflito de concorrência
      throw erro;
    }

    // desconto ok: registra a baixa na mesma transação.
    return tx.baixa.create({ data: { produtoId, quantidade, responsavel } });
  });
}
