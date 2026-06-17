"use client";

import { useEstoque } from "@/context/estoque-context";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function VisualizacaoPage() {
  const { produtos } = useEstoque();

  return (
    <Card>
      <CardContent>
        <Badge variant="secondary" className="mb-3">
          Estoque
        </Badge>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">Visualização</h1>
        <p className="mb-4 text-muted-foreground">
          Produtos cadastrados e quantidades disponíveis.
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Mínimo</TableHead>
              <TableHead>Situação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtos.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.nome}</TableCell>
                <TableCell>{p.categoria}</TableCell>
                <TableCell>{p.quantidade}</TableCell>
                <TableCell>{p.minimo}</TableCell>
                <TableCell>
                  <Badge variant={p.quantidade < p.minimo ? "destructive" : "secondary"}>
                    {p.quantidade < p.minimo ? "Abaixo do mínimo" : "OK"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
