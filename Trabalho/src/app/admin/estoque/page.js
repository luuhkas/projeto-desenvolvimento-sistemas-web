"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { api } from "@/lib/api";
import { useAuth } from "@/context/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LIMITE = 5; // itens por página
const ADMINS = ["ADMIN", "SUPER_ADMIN"];

export default function VisualizacaoPage() {
  const { usuario } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);
  const [paginas, setPaginas] = useState(1);
  const [pagina, setPagina] = useState(1);
  const [q, setQ] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("nome");
  const [ordem, setOrdem] = useState("asc");

  // edição inline e confirmação de exclusão por linha
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({ nome: "", categoria: "", quantidade: 0, minimo: 0 });
  const [confirmandoId, setConfirmandoId] = useState(null);

  // quem edita = Admin/Super Admin; quem exclui = só Super Admin (igual ao back)
  const podeEditar = ADMINS.includes(usuario?.papel);
  const podeRemover = usuario?.papel === "SUPER_ADMIN";
  const temAcoes = podeEditar || podeRemover;

  // busca na API com paginação, filtro e ordenação
  const carregar = useCallback(() => {
    const params = new URLSearchParams({
      pagina: String(pagina),
      limite: String(LIMITE),
      ordenarPor,
      ordem,
    });
    if (q.trim()) params.set("q", q.trim());

    api(`/produtos?${params.toString()}`)
      .then((r) => {
        setProdutos(r?.dados ?? []);
        setTotal(r?.total ?? 0);
        setPaginas(r?.paginas ?? 1);
      })
      .catch(() => setProdutos([]));
  }, [q, ordenarPor, ordem, pagina]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  function iniciarEdicao(p) {
    setConfirmandoId(null);
    setEditandoId(p.id);
    setForm({ nome: p.nome, categoria: p.categoria, quantidade: p.quantidade, minimo: p.minimo });
  }

  async function salvarEdicao(id) {
    const qtd = Number(form.quantidade);
    const min = Number(form.minimo);
    if (form.nome.trim().length < 2 || form.categoria.trim().length < 2) {
      toast.error("Informe nome e categoria (mín. 2 caracteres).");
      return;
    }
    if (!Number.isInteger(qtd) || qtd < 0 || !Number.isInteger(min) || min < 0) {
      toast.error("Quantidade e mínimo devem ser inteiros e não-negativos.");
      return;
    }
    try {
      await api(`/produtos/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          nome: form.nome.trim(),
          categoria: form.categoria.trim(),
          quantidade: qtd,
          minimo: min,
        }),
      });
      toast.success("Produto atualizado!");
      setEditandoId(null);
      carregar();
    } catch (erro) {
      toast.error(erro.message);
    }
  }

  async function excluir(id) {
    try {
      await api(`/produtos/${id}`, { method: "DELETE" });
      toast.success("Produto excluído.");
      setConfirmandoId(null);
      carregar();
    } catch (erro) {
      toast.error(erro.message);
    }
  }

  function aoBuscar(valor) {
    setQ(valor);
    setPagina(1); // ao buscar, volta pra primeira página
  }

  // clicar no cabeçalho ordena por aquela coluna (alterna asc/desc)
  function ordenarCol(campo) {
    if (ordenarPor === campo) {
      setOrdem((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setOrdenarPor(campo);
      setOrdem("asc");
    }
    setPagina(1);
  }

  const seta = (campo) =>
    ordenarPor === campo ? (ordem === "asc" ? " ↑" : " ↓") : "";

  return (
    <Card>
      <CardContent>
        <Badge variant="secondary" className="mb-3">
          Estoque
        </Badge>
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight">Visualização</h1>
        <p className="mb-4 text-muted-foreground">
          Produtos cadastrados e quantidades disponíveis.
        </p>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Input
            placeholder="Buscar por nome..."
            value={q}
            onChange={(e) => aoBuscar(e.target.value)}
            className="max-w-xs"
          />
          <span className="text-sm text-muted-foreground">{total} produto(s)</span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => ordenarCol("nome")}
              >
                Produto{seta("nome")}
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => ordenarCol("categoria")}
              >
                Categoria{seta("categoria")}
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => ordenarCol("quantidade")}
              >
                Quantidade{seta("quantidade")}
              </TableHead>
              <TableHead>Mínimo</TableHead>
              <TableHead>Situação</TableHead>
              {temAcoes && <TableHead className="text-right">Ações</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtos.map((p) =>
              editandoId === p.id ? (
                <TableRow key={p.id}>
                  <TableCell>
                    <Input
                      value={form.nome}
                      onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={form.categoria}
                      onChange={(e) => setForm((f) => ({ ...f, categoria: e.target.value }))}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={form.quantidade}
                      onChange={(e) => setForm((f) => ({ ...f, quantidade: e.target.value }))}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={form.minimo}
                      onChange={(e) => setForm((f) => ({ ...f, minimo: e.target.value }))}
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell className="text-muted-foreground">—</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" onClick={() => salvarEdicao(p.id)}>
                        Salvar
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditandoId(null)}>
                        Cancelar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell>{p.categoria}</TableCell>
                  <TableCell>{p.quantidade}</TableCell>
                  <TableCell>{p.minimo}</TableCell>
                  <TableCell>
                    <Badge variant={p.quantidade < p.minimo ? "destructive" : "secondary"}>
                      {p.quantidade < p.minimo ? "Abaixo do mínimo" : "OK"}
                    </Badge>
                  </TableCell>
                  {temAcoes && (
                    <TableCell className="text-right">
                      {confirmandoId === p.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-sm text-muted-foreground">Excluir?</span>
                          <Button size="sm" variant="destructive" onClick={() => excluir(p.id)}>
                            Confirmar
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setConfirmandoId(null)}>
                            Não
                          </Button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          {podeEditar && (
                            <Button size="sm" variant="outline" onClick={() => iniciarEdicao(p)}>
                              Editar
                            </Button>
                          )}
                          {podeRemover && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditandoId(null);
                                setConfirmandoId(p.id);
                              }}
                            >
                              Excluir
                            </Button>
                          )}
                        </div>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )
            )}
            {produtos.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={temAcoes ? 6 : 5}
                  className="text-center text-muted-foreground"
                >
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Página {pagina} de {paginas}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={pagina <= 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagina((p) => Math.min(paginas, p + 1))}
              disabled={pagina >= paginas}
            >
              Próxima
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
