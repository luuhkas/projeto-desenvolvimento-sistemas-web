"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { baixaSchema } from "@/lib/validations";
import { baixasMock, produtosMock } from "@/data/estoque";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BaixasPage() {
  const [baixas, setBaixas] = useState(baixasMock);

  const form = useForm({
    resolver: zodResolver(baixaSchema),
    defaultValues: { produto: produtosMock[0].nome, quantidade: 1 },
  });

  function aoRegistrar(valores) {
    const nova = {
      id: Date.now(),
      data: new Date().toISOString().slice(0, 10),
      produto: valores.produto,
      quantidade: valores.quantidade,
      responsavel: "Usuário logado",
    };
    setBaixas((atual) => [nova, ...atual]);
    form.reset({ produto: produtosMock[0].nome, quantidade: 1 });
    toast.success("Baixa registrada!");
  }

  return (
    <Card>
      <CardContent>
        <Badge variant="secondary" className="mb-3">
          Estoque
        </Badge>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">Baixas</h1>
        <p className="mb-4 text-muted-foreground">
          Registre saídas de produtos do estoque.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(aoRegistrar)}
            className="mb-6 flex flex-wrap items-start gap-3"
          >
            <FormField
              control={form.control}
              name="produto"
              render={({ field }) => (
                <FormItem className="min-w-56 flex-1">
                  <FormLabel>Produto</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {produtosMock.map((p) => (
                        <SelectItem key={p.id} value={p.nome}>
                          {p.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantidade"
              render={({ field }) => (
                <FormItem className="w-32">
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-[1.625rem]">
              Registrar baixa
            </Button>
          </form>
        </Form>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Responsável</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {baixas.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.data}</TableCell>
                <TableCell className="font-medium">{b.produto}</TableCell>
                <TableCell>{b.quantidade}</TableCell>
                <TableCell className="text-muted-foreground">{b.responsavel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
