"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";
import { useEstoque } from "@/context/estoque-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// mapeia o status vindo da previsão de ruptura para um Badge com a cor certa
const STATUS = {
  critico: { texto: "Crítico", variant: "destructive" },
  alerta: { texto: "Alerta", variant: "secondary" },
  ok: { texto: "OK", variant: "outline" },
};

export default function RelatoriosPage() {
  const { produtos, baixas } = useEstoque();
  const [tipo, setTipo] = useState("estoque");
  const [baixoEstoque, setBaixoEstoque] = useState([]);
  const [previsao, setPrevisao] = useState([]);

  const ehEstoque = tipo === "estoque";
  const ehBaixas = tipo === "baixas";
  const ehBaixo = tipo === "baixo";
  const ehRuptura = tipo === "ruptura";

  // as duas abas de inteligência vêm da API (não do contexto local)
  useEffect(() => {
    if (tipo === "baixo") api("/relatorios/baixo-estoque").then(setBaixoEstoque).catch(() => {});
    if (tipo === "ruptura") api("/relatorios/previsao").then(setPrevisao).catch(() => {});
  }, [tipo]);

  return (
    <Card>
      <CardContent>
        <Badge variant="secondary" className="mb-3">
          Estoque
        </Badge>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">Relatórios</h1>
        <p className="mb-4 text-muted-foreground">
          Gere relatórios consolidados do sistema.
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          <Button
            variant={ehEstoque ? "default" : "outline"}
            size="sm"
            onClick={() => setTipo("estoque")}
          >
            Posição de estoque
          </Button>
          <Button
            variant={ehBaixas ? "default" : "outline"}
            size="sm"
            onClick={() => setTipo("baixas")}
          >
            Histórico de baixas
          </Button>
          <Button
            variant={ehBaixo ? "default" : "outline"}
            size="sm"
            onClick={() => setTipo("baixo")}
          >
            Baixo estoque
          </Button>
          <Button
            variant={ehRuptura ? "default" : "outline"}
            size="sm"
            onClick={() => setTipo("ruptura")}
          >
            Previsão de ruptura
          </Button>
        </div>

        {ehEstoque && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtos.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell>{p.categoria}</TableCell>
                  <TableCell>{p.quantidade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {ehBaixas && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Responsável</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {baixas.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{b.data?.slice(0, 10)}</TableCell>
                  <TableCell className="font-medium">{b.produto?.nome}</TableCell>
                  <TableCell>{b.quantidade}</TableCell>
                  <TableCell className="text-muted-foreground">{b.responsavel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {ehBaixo && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Mínimo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {baixoEstoque.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-muted-foreground">
                    Nenhum produto no ou abaixo do mínimo.
                  </TableCell>
                </TableRow>
              ) : (
                baixoEstoque.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.nome}</TableCell>
                    <TableCell>{p.categoria}</TableCell>
                    <TableCell>{p.quantidade}</TableCell>
                    <TableCell className="text-muted-foreground">{p.minimo}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        {ehRuptura && (
          <>
            <p className="mb-3 text-sm text-muted-foreground">
              Estimativa de quantos dias o estoque dura, pelo consumo médio dos últimos 30 dias.
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Consumo/dia</TableHead>
                  <TableHead>Acaba em</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {previsao.map((p) => {
                  const s = STATUS[p.status] ?? STATUS.ok;
                  return (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.nome}</TableCell>
                      <TableCell>{p.quantidade}</TableCell>
                      <TableCell>{p.consumoDiario}</TableCell>
                      <TableCell>
                        {p.diasRestantes === null ? "—" : `${p.diasRestantes} dias`}
                      </TableCell>
                      <TableCell>
                        <Badge variant={s.variant}>{s.texto}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  );
}
