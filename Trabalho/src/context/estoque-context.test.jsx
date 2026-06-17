import { act, renderHook, waitFor } from "@testing-library/react";

import { EstoqueProvider, useEstoque } from "@/context/estoque-context";
import { api } from "@/lib/api";

// o contexto agora fala com a API; mockamos a camada de api
jest.mock("@/lib/api");

function wrapper({ children }) {
  return <EstoqueProvider>{children}</EstoqueProvider>;
}

describe("EstoqueContext (integração com a API)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    api.mockResolvedValue([]); // /produtos e /baixas no carregamento inicial
  });

  it("carrega produtos e baixas da API ao montar", async () => {
    renderHook(() => useEstoque(), { wrapper });
    await waitFor(() => {
      expect(api).toHaveBeenCalledWith("/produtos");
      expect(api).toHaveBeenCalledWith("/baixas");
    });
  });

  it("adicionarProduto faz POST em /produtos", async () => {
    const { result } = renderHook(() => useEstoque(), { wrapper });
    await act(async () => {
      await result.current.adicionarProduto({
        nome: "X",
        categoria: "Y",
        quantidade: 1,
        minimo: 0,
      });
    });
    expect(api).toHaveBeenCalledWith(
      "/produtos",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("registrarBaixa faz POST em /baixas", async () => {
    const { result } = renderHook(() => useEstoque(), { wrapper });
    await act(async () => {
      await result.current.registrarBaixa({ produtoId: 1, quantidade: 2 });
    });
    expect(api).toHaveBeenCalledWith(
      "/baixas",
      expect.objectContaining({ method: "POST" })
    );
  });
});
