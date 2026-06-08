"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { convidarSchema } from "@/lib/validations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function ConvidarPage() {
  const form = useForm({
    resolver: zodResolver(convidarSchema),
    defaultValues: { email: "" },
  });

  function aoEnviar(valores) {
    toast.success("Convite enviado com sucesso!", {
      description: `Um convite foi enviado para ${valores.email}.`,
    });
    form.reset();
  }

  return (
    <main className="mx-auto w-[min(1120px,92vw)] py-12">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            Administração
          </Badge>
          <CardTitle className="text-2xl">Convidar usuário</CardTitle>
          <CardDescription>
            Envie um convite por e-mail para um novo usuário do sistema.
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
                    <FormLabel>E-mail do convidado</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="convidado@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-1">
                Enviar convite
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
