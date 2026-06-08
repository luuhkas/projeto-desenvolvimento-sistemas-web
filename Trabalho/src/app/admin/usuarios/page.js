"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/context/auth-context";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UsuariosPage() {
  const { listarUsuarios } = useAuth();
  const [usuarios, setUsuarios] = useState([]);

  // a lista vem do localStorage, entao so dá pra ler no client (useEffect)
  useEffect(() => {
    setUsuarios(listarUsuarios());
  }, [listarUsuarios]);

  return (
    <main className="mx-auto w-[min(1120px,92vw)] py-12">
      <Card>
        <CardContent>
          <Badge variant="secondary" className="mb-3">
            Administração
          </Badge>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight">
            Gerenciamento de usuários
          </h1>
          <p className="mb-4 text-muted-foreground">
            Lista de usuários cadastrados no sistema.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((u) => (
                <TableRow key={u.email}>
                  <TableCell className="font-medium">{u.nome}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
