import { loginSchema, baixaSchema, cadastroSchema } from "@/lib/validations";

describe("loginSchema", () => {
  it("aceita e-mail e senha válidos", () => {
    const r = loginSchema.safeParse({ email: "ana@ex.com", senha: "1234" });
    expect(r.success).toBe(true);
  });

  it("rejeita e-mail inválido", () => {
    const r = loginSchema.safeParse({ email: "ana", senha: "1234" });
    expect(r.success).toBe(false);
    expect(r.error.issues[0].message).toBe("E-mail inválido.");
  });

  it("rejeita senha curta", () => {
    const r = loginSchema.safeParse({ email: "ana@ex.com", senha: "12" });
    expect(r.success).toBe(false);
  });
});

describe("baixaSchema", () => {
  it("rejeita quantidade zero ou negativa", () => {
    expect(baixaSchema.safeParse({ produto: "X", quantidade: 0 }).success).toBe(false);
    expect(baixaSchema.safeParse({ produto: "X", quantidade: -3 }).success).toBe(false);
  });

  it("aceita quantidade inteira positiva", () => {
    expect(baixaSchema.safeParse({ produto: "X", quantidade: 5 }).success).toBe(true);
  });
});

describe("cadastroSchema", () => {
  it("rejeita quando as senhas não conferem", () => {
    const r = cadastroSchema.safeParse({
      nome: "Ana",
      email: "ana@ex.com",
      senha: "1234",
      confirmarSenha: "9999",
    });
    expect(r.success).toBe(false);
  });
});
