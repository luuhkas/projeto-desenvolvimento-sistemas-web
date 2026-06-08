import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Sobre | Estoque+",
};

const itens = [
  {
    rotulo: "Framework",
    titulo: "Next.js",
    texto: "App Router com roteamento por pastas e Server Components.",
  },
  {
    rotulo: "Estilo",
    titulo: "Tailwind + shadcn/ui",
    texto: "Componentes acessíveis estilizados com utilitários do Tailwind CSS.",
  },
  {
    rotulo: "Formulários",
    titulo: "RHF + Zod",
    texto: "React Hook Form com validação por schemas do Zod.",
  },
  {
    rotulo: "Acesso",
    titulo: "Middleware",
    texto: "Proteção das rotas privadas direto no middleware do Next.",
  },
];

export default function SobrePage() {
  return (
    <main className="mx-auto w-[min(1120px,92vw)] py-12">
      <Card className="mb-6">
        <CardContent>
          <Badge variant="secondary" className="mb-3">
            Sobre
          </Badge>
          <h1 className="mb-3 text-3xl font-extrabold tracking-tight">Sobre o sistema</h1>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">
            O Estoque+ é um sistema acadêmico desenvolvido como trabalho da disciplina de
            Projeto e Desenvolvimento de Sistemas Web. Aplica componentização, validação
            de formulários, navegação entre telas e controle de acesso por middleware,
            usando o máximo possível de bibliotecas e frameworks do ecossistema React.
          </p>
        </CardContent>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {itens.map((item) => (
          <Card key={item.titulo}>
            <CardHeader>
              <Badge variant="outline" className="w-fit">
                {item.rotulo}
              </Badge>
              <CardTitle className="text-xl">{item.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.texto}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
