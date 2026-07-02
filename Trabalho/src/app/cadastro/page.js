"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { cadastroSchema } from "@/lib/validations";
import { useAuth } from "@/context/auth-context";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function FormularioCadastro() {
  const router = useRouter();
  const { cadastrar, login } = useAuth();
  const token = useSearchParams().get("token");
  const [emailConvite, setEmailConvite] = useState("");

  const form = useForm({
    resolver: zodResolver(cadastroSchema),
    defaultValues: { nome: "", email: "", senha: "", confirmarSenha: "" },
  });

  // se veio token, valida o convite e preenche/trava o e-mail
  useEffect(() => {
    if (!token) return;
    api(`/convites/${token}`)
      .then((c) => {
        setEmailConvite(c.email);
        form.setValue("email", c.email);
      })
      .catch(() => toast.error("Convite inválido ou expirado."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function aoEnviar(valores) {
    // fluxo por CONVITE: aceita o convite e já loga
    if (token) {
      const r = await api(`/convites/${token}/aceitar`, {
        method: "POST",
        body: JSON.stringify({ nome: valores.nome, senha: valores.senha }),
      }).catch((e) => ({ erro: e.message }));
      if (r?.erro) {
        form.setError("email", { message: r.erro });
        return;
      }
      await login(emailConvite, valores.senha);
      toast.success("Conta criada com sucesso!");
      router.push("/admin");
      return;
    }

    // fluxo ABERTO (sem token): cadastro normal
    const resultado = await cadastrar(valores.nome, valores.email, valores.senha);
    if (!resultado.ok) {
      form.setError("email", { message: resultado.erro });
      return;
    }
    await login(valores.email, valores.senha);
    toast.success("Conta criada com sucesso!");
    router.push("/admin");
  }

  return (
    <main className="mx-auto w-[min(1120px,92vw)] py-12">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            {token ? "Convite" : "Novo usuário"}
          </Badge>
          <CardTitle className="text-2xl">Criar conta</CardTitle>
          <CardDescription>
            {token
              ? "Complete seu cadastro para aceitar o convite."
              : "Crie sua conta para acessar o sistema."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(aoEnviar)} className="grid gap-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="voce@email.com"
                        disabled={Boolean(token)}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmarSenha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-1">
                Criar conta
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          <p>
            Já tem conta?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

export default function CadastroPage() {
  return (
    <Suspense fallback={null}>
      <FormularioCadastro />
    </Suspense>
  );
}
