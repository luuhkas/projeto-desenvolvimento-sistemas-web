# Sistema de Estoque — Front-end

Front-end do Sistema de Estoque, feito com **Next.js (App Router)**. Consome a API do
projeto `../Trabalho-Backend` e é uma das três partes do sistema:

| Serviço | Pasta | Porta |
|---|---|---|
| **Front-end (este projeto)** | `../Trabalho` | **3000** |
| API principal | `../Trabalho-Backend` | 8080 |
| Microsserviço de e-mail | `../Trabalho-Email` | 8000 |

## Stack
- **Next.js 16** (App Router) — roteamento por pastas em `src/app`
- **Tailwind CSS v4** — estilização por utilitários (sem CSS escrito à mão)
- **shadcn/ui** — componentes de UI (Button, Card, Input, Table, Select, Form, Badge, Chart, Sonner)
- **Recharts / shadcn Charts** — gráficos do dashboard
- **React Hook Form + Zod** — todos os formulários com validação por schema
- **Middleware do Next.js** — proteção de rotas e controle de acesso por papel
- **js-cookie** — sessão em cookie (para o middleware ler no servidor)
- **Context API** — estado de autenticação (`auth-context`) e de estoque (`estoque-context`)
- **Jest + React Testing Library** — testes automatizados (`npm test`)

## Como rodar

Pré-requisito: a **API** (`../Trabalho-Backend`) precisa estar rodando na porta 8080.

Crie um arquivo **`.env.local`** apontando para a API:
```
NEXT_PUBLIC_API_URL="http://localhost:8080"
```

Depois:
```bash
npm install
npm run dev        # abre http://localhost:3000
```

Testes:
```bash
npm test
```

## Login de teste
Depois de rodar o `seed` da API:
- **admin@estoque.com** / **123456** — papel **Super Admin**

## Telas
Públicas: `/` (home), `/sobre`, `/contato`, `/login`, `/cadastro`.

Privadas (exigem login): `/admin` e o módulo de estoque `/admin/estoque`
(`baixas`, `cadastros`, `metricas`, `relatorios`).

Restritas por papel:
- `/admin/usuarios` e `/admin/convidar` — Admin ou Super Admin
- `/admin/backoffice` — só Super Admin

## Controle de acesso (por papel)
O `src/middleware.js` roda no servidor antes das rotas do `matcher`:

1. Acesso a `/admin/*` **sem** sessão → redireciona para `/login?redirect=<rota>`.
2. Acesso a `/login`/`/cadastro` **com** sessão → redireciona para `/admin`.
3. Rotas restritas (usuários, convidar, backoffice) só abrem para o **papel** certo,
   lido do cookie da sessão.

A sessão fica em cookies (`estoque_token` com o JWT e `estoque_usuario` com nome/e-mail/papel).
A navbar mostra/esconde os atalhos conforme o papel do usuário. Essa proteção no front é de
conveniência (UX) — a barreira real é a política **ABAC** do back-end (que devolve `403`).

## Dashboard e integração
A tela **Métricas** (`/admin/estoque/metricas`) é um dashboard que consome os relatórios da
API (`/relatorios/*`): cards de indicador + gráfico de barras (por categoria) + gráfico de
linha (consumo por dia), com **shadcn Charts**. A tela de **cadastro** aceita o link de
convite (`/cadastro?token=...`) e a de **backoffice** controla a rotina de balanço diário.

## Organização do código
```
src/
  app/                 # rotas (App Router); admin/ é a área protegida
  components/
    navbar.jsx
    ui/                # componentes do shadcn/ui (inclui chart)
  context/
    auth-context.jsx   # sessão/usuário (Context API)
    estoque-context.jsx# produtos e baixas (lidos da API)
  lib/
    api.js             # cliente HTTP (anexa o token JWT)
    auth.js            # sessão em cookies
    validations.js     # schemas Zod dos formulários
  middleware.js        # proteção de rotas + controle por papel
```
