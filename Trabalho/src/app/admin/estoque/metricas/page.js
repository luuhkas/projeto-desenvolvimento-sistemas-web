"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const configCategoria = {
  quantidade: { label: "Quantidade", color: "#6366f1" },
};
const configConsumo = {
  total: { label: "Consumo", color: "#22c55e" },
};
const configTop = {
  totalBaixado: { label: "Baixado", color: "#f59e0b" },
};
// paleta pras fatias da pizza (distribuição por categoria)
const CORES = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#a855f7", "#ec4899"];

export default function MetricasPage() {
  const [resumo, setResumo] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [mov, setMov] = useState([]);
  const [top, setTop] = useState([]);

  useEffect(() => {
    api("/relatorios/resumo").then(setResumo).catch(() => {});
    api("/relatorios/por-categoria").then(setCategorias).catch(() => {});
    api("/relatorios/movimentacoes").then(setMov).catch(() => {});
    api("/relatorios/mais-movimentados").then(setTop).catch(() => {});
  }, []);

  const cards = [
    { rotulo: "Produtos", valor: resumo?.totalProdutos },
    { rotulo: "Itens em estoque", valor: resumo?.itensEmEstoque },
    { rotulo: "Baixas", valor: resumo?.totalBaixas },
    { rotulo: "Abaixo do mínimo", valor: resumo?.abaixoDoMinimo },
  ];

  return (
    <div>
      <div className="mb-6">
        <Badge variant="secondary" className="mb-3">
          Estoque
        </Badge>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">Métricas</h1>
        <p className="text-muted-foreground">Indicadores e gráficos do estoque.</p>
      </div>

      <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.rotulo}>
            <CardHeader>
              <CardDescription>{c.rotulo}</CardDescription>
              <CardTitle className="text-3xl">{c.valor ?? "—"}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quantidade por categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={configCategoria} className="h-72 w-full">
              <BarChart data={categorias} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="categoria"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={0}
                  tickFormatter={(v) => (v.length > 8 ? v.slice(0, 8) + "…" : v)}
                />
                <YAxis tickLine={false} axisLine={false} width={32} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="quantidade" fill="var(--color-quantidade)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Consumo por dia</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={configConsumo} className="h-72 w-full">
              <LineChart data={mov} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="dia" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} width={32} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="total"
                  type="monotone"
                  stroke="var(--color-total)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição do estoque</CardTitle>
            <CardDescription>Proporção da quantidade por categoria.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={configCategoria} className="h-72 w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="categoria" />} />
                <Pie
                  data={categorias}
                  dataKey="quantidade"
                  nameKey="categoria"
                  innerRadius={55}
                  strokeWidth={2}
                >
                  {categorias.map((c, i) => (
                    <Cell key={c.categoria} fill={CORES[i % CORES.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Produtos mais movimentados</CardTitle>
            <CardDescription>Total baixado por produto.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={configTop} className="h-72 w-full">
              <BarChart
                data={top}
                layout="vertical"
                margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
              >
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="nome"
                  tickLine={false}
                  axisLine={false}
                  width={110}
                  tickFormatter={(v) => (v.length > 14 ? v.slice(0, 14) + "…" : v)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="totalBaixado" fill="var(--color-totalBaixado)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
