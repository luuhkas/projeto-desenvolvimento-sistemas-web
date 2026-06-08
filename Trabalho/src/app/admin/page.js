"use client";

import Link from "next/link";
import { Boxes, PackagePlus, Users } from "lucide-react";

import { useAuth } from "@/context/auth-context";
import { produtosMock, baixasMock } from "@/data/estoque";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { usuario } = useAuth();

  const totalItens = produtosMock.reduce((acc, p) => acc + p.quantidade, 0);
  const abaixoMinimo = produtosMock.filter((p) => p.quantidade < p.minimo).length;

  const cards = [
    { rotulo: "Produtos", valor: produtosMock.length, texto: "itens cadastrados no catálogo." },
    { rotulo: "Estoque total", valor: totalItens, texto: "unidades disponíveis somadas." },
    { rotulo: "Alertas", valor: abaixoMinimo, texto: "produtos abaixo do estoque mínimo." },
    { rotulo: "Baixas", valor: baixasMock.length, texto: "baixas registradas recentemente." },
  ];

  return (
    <main className="mx-auto w-[min(1120px,92vw)] py-12">
      <Card className="mb-6">
        <CardContent>
          <Badge variant="secondary" className="mb-3">
            Área restrita
          </Badge>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo, {usuario?.nome ?? "usuário"}. Visão geral do sistema de estoque.
          </p>
        </CardContent>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.rotulo}>
            <CardHeader>
              <CardDescription>{card.rotulo}</CardDescription>
              <CardTitle className="text-3xl">{card.valor}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{card.texto}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Atalhos</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/admin/usuarios">
              <Users />
              Gerenciar usuários
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/convidar">
              <PackagePlus />
              Convidar usuário
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/estoque">
              <Boxes />
              Ir para o estoque
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
