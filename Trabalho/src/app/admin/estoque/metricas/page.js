import { produtosMock, baixasMock } from "@/data/estoque";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MetricasPage() {
  const totalItens = produtosMock.reduce((acc, p) => acc + p.quantidade, 0);
  const abaixoMinimo = produtosMock.filter((p) => p.quantidade < p.minimo).length;
  const totalBaixas = baixasMock.reduce((acc, b) => acc + b.quantidade, 0);
  const categorias = new Set(produtosMock.map((p) => p.categoria)).size;

  const cards = [
    { rotulo: "Itens em estoque", valor: totalItens, texto: "unidades disponíveis no total." },
    { rotulo: "Categorias", valor: categorias, texto: "categorias distintas cadastradas." },
    { rotulo: "Abaixo do mínimo", valor: abaixoMinimo, texto: "produtos precisando reposição." },
    { rotulo: "Baixas registradas", valor: totalBaixas, texto: "unidades retiradas recentemente." },
  ];

  return (
    <div>
      <div className="mb-6">
        <Badge variant="secondary" className="mb-3">
          Estoque
        </Badge>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">Métricas</h1>
        <p className="text-muted-foreground">Indicadores resumidos do estoque atual.</p>
      </div>

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
    </div>
  );
}
