"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { api } from "@/lib/api";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BackofficePage() {
  const [cronExpr, setCronExpr] = useState("");
  const [emails, setEmails] = useState([]);

  function carregarEmails() {
    api("/backoffice/emails").then(setEmails).catch(() => setEmails([]));
  }

  useEffect(() => {
    api("/backoffice/rotina")
      .then((c) => setCronExpr(c?.cron ?? ""))
      .catch(() => {});
    carregarEmails();
  }, []);

  async function salvar() {
    try {
      await api("/backoffice/rotina", {
        method: "PUT",
        body: JSON.stringify({ cron: cronExpr }),
      });
      toast.success("Horário da rotina atualizado.");
    } catch (e) {
      toast.error(e.message);
    }
  }

  async function disparar() {
    try {
      await api("/backoffice/rotina/disparar", { method: "POST" });
      toast.success("Balanço disparado! Confira o log abaixo.");
      carregarEmails();
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <main className="mx-auto w-[min(1120px,92vw)] py-12">
      <Badge variant="secondary" className="mb-3">
        Super Admin
      </Badge>
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight">Backoffice</h1>
      <p className="mb-6 text-muted-foreground">
        Controle da rotina de balanço diário e histórico de e-mails.
      </p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Rotina de balanço diário</CardTitle>
          <CardDescription>
            Horário no formato cron (ex.: &quot;0 18 * * *&quot; = todo dia às 18h).
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-end gap-3">
          <div className="grid gap-1">
            <label className="text-sm text-muted-foreground">Expressão cron</label>
            <Input
              value={cronExpr}
              onChange={(e) => setCronExpr(e.target.value)}
              className="w-48 font-mono"
            />
          </div>
          <Button onClick={salvar}>Salvar horário</Button>
          <Button variant="outline" onClick={disparar}>
            Disparar agora
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">E-mails enviados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Para</TableHead>
                <TableHead>Assunto</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="text-muted-foreground">{e.para}</TableCell>
                  <TableCell className="font-medium">{e.assunto}</TableCell>
                  <TableCell>
                    <Badge variant={e.status === "enviado" ? "default" : "destructive"}>
                      {e.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
