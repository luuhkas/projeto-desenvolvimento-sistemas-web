"use client";

import { useState } from "react";

import { produtosMock, baixasMock } from "@/data/estoque";
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

export default function RelatoriosPage() {
  const [tipo, setTipo] = useState("estoque");
  const ehEstoque = tipo === "estoque";

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
            variant={!ehEstoque ? "default" : "outline"}
            size="sm"
            onClick={() => setTipo("baixas")}
          >
            Histórico de baixas
          </Button>
        </div>

        {ehEstoque ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtosMock.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell>{p.categoria}</TableCell>
                  <TableCell>{p.quantidade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
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
              {baixasMock.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{b.data}</TableCell>
                  <TableCell className="font-medium">{b.produto}</TableCell>
                  <TableCell>{b.quantidade}</TableCell>
                  <TableCell className="text-muted-foreground">{b.responsavel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
