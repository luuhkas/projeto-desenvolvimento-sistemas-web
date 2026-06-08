import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main className="mx-auto w-[min(1120px,92vw)] py-12">
      <section className="grid items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_minmax(300px,400px)]">
        <Card className="justify-center">
          <CardContent>
            <Badge variant="secondary" className="mb-4">
              Trabalho de Front-end
            </Badge>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              Sistema de Estoque
            </h1>
            <p className="max-w-xl leading-relaxed text-muted-foreground">
              Aplicação para gestão de estoque com páginas públicas, login e área
              administrativa protegida. Construída com Next.js, Tailwind CSS, shadcn/ui
              e proteção de rotas via middleware.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/login">
                  Entrar no sistema
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/sobre">Sobre o projeto</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/contato">Contato</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="justify-center bg-primary/10">
          <CardContent>
            <Badge className="mb-4">
              <ShieldCheck />
              Acesso protegido
            </Badge>
            <p className="text-6xl font-black leading-none text-primary">13</p>
            <p className="mt-3 text-muted-foreground">
              rotas entre públicas e privadas, com middleware do Next.js verificando a
              autenticação.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
