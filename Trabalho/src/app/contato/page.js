"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { contatoSchema } from "@/lib/validations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
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

export default function ContatoPage() {
  const form = useForm({
    resolver: zodResolver(contatoSchema),
    defaultValues: { nome: "", email: "", mensagem: "" },
  });

  function aoEnviar(valores) {
    // sem back-end: so confirma o envio com um toast
    toast.success("Mensagem enviada com sucesso!", {
      description: `Obrigado pelo contato, ${valores.nome}.`,
    });
    form.reset();
  }

  return (
    <main className="mx-auto w-[min(1120px,92vw)] py-12">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            Contato
          </Badge>
          <CardTitle className="text-2xl">Fale conosco</CardTitle>
          <CardDescription>
            Envie sua dúvida, sugestão ou solicitação de acesso ao sistema.
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
                      <Input type="email" placeholder="voce@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mensagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Escreva sua mensagem..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-1">
                Enviar mensagem
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
