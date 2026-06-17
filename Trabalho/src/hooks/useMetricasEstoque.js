"use client";

import { useEstoque } from "@/context/estoque-context";

// Hook customizado que concentra a logica de negocio das metricas.
// Antes esses calculos estavam duplicados no dashboard e na tela de metricas;
// agora ficam num so lugar e leem o estado compartilhado do EstoqueContext.
export function useMetricasEstoque() {
  const { produtos, baixas } = useEstoque();

  const totalProdutos = produtos.length;
  const totalItens = produtos.reduce((acc, p) => acc + p.quantidade, 0);
  const abaixoMinimo = produtos.filter((p) => p.quantidade < p.minimo).length;
  const categorias = new Set(produtos.map((p) => p.categoria)).size;
  const totalBaixasCount = baixas.length;
  const totalBaixasQtd = baixas.reduce((acc, b) => acc + b.quantidade, 0);

  return {
    totalProdutos,
    totalItens,
    abaixoMinimo,
    categorias,
    totalBaixasCount,
    totalBaixasQtd,
  };
}
