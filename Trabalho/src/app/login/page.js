"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema } from "@/lib/validations";
import { useAuth } from "@/context/auth-context";
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

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", senha: "" },
  });

  async function aoEnviar(valores) {
    const resultado = await login(valores.email, valores.senha);
    if (!resultado.ok) {
      form.setError("senha", { message: resultado.erro });
      return;
    }
    toast.success("Login realizado com sucesso!");
    // se o middleware mandou pra ca com ?redirect=..., volta pra rota tentada
    const params = new URLSearchParams(window.location.search);
    router.push(params.get("redirect") || "/admin");
  }

  return (
    <main className="mx-auto w-[min(1120px,92vw)] py-12">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            Acesso
          </Badge>
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>
            Informe e-mail e senha para acessar a área administrativa.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(aoEnviar)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="voce@email.com" {...field} />
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
              <Button type="submit" className="mt-1">
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm text-muted-foreground">
          <p>
            Não tem conta?{" "}
            <Link href="/cadastro" className="font-semibold text-primary hover:underline">
              Cadastre-se
            </Link>
          </p>
          <p>
            Acesso de teste: <strong>admin@estoque.com</strong> / <strong>123456</strong>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
