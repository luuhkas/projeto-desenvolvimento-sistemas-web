# Trabalho - Sistema de Estoque

Front-end de um sistema de estoque feito para a disciplina de Projeto e Desenvolvimento
de Sistemas Web. Reescrito para usar o máximo de bibliotecas e frameworks do ecossistema
React, conforme o material de apoio da disciplina.

## Stack

- **Next.js 16** (App Router) — roteamento por pastas em `src/app`
- **Tailwind CSS v4** — estilização por utilitários (sem CSS escrito à mão)
- **shadcn/ui** — componentes de UI (Button, Card, Input, Table, Select, Form, Badge, Sonner)
- **React Hook Form + Zod** — todos os formulários com validação por schema
- **Middleware do Next.js** — controle de acesso / proteção de rotas
- **js-cookie** — sessão em cookie (para o middleware conseguir lê-la no servidor)
- **Context API** — estado compartilhado de autenticação (`AuthContext`) e de estoque (`EstoqueContext`)
- **prop-types** — validação de props dos componentes próprios
- **Jest + React Testing Library** — testes automatizados (`npm test`)

## Como rodar

```
npm install
npm run dev
```

Abrir em http://localhost:3000.

Para rodar os testes:

```
npm test
```

## Login de teste

- email: `admin@estoque.com`
- senha: `123456`

Também dá pra criar conta nova na tela de cadastro (`/cadastro`).

## Estrutura de rotas (13 telas)

Públicas: `/` (home), `/sobre`, `/contato`, `/login`, `/cadastro`.

Privadas (exigem login): `/admin` (dashboard), `/admin/usuarios`, `/admin/convidar` e o
módulo de estoque `/admin/estoque` com `baixas`, `cadastros`, `metricas` e `relatorios`.

## Como o controle de acesso funciona

O arquivo `src/middleware.js` roda no servidor antes de cada rota do `matcher`:

1. Acesso a `/admin/*` **sem** sessão → redireciona para `/login?redirect=<rota>`.
2. Acesso a `/login` ou `/cadastro` **com** sessão → redireciona para `/admin`.

A sessão fica em um **cookie** (`estoque_sessao`) justamente para que o middleware
consiga lê-la no servidor. O `AuthProvider` (`src/context/auth-context.jsx`) cuida de
login, cadastro e logout no client, gravando/limpando esse cookie.

## Organização do código

```
src/
  app/                 # rotas (App Router)
    admin/             # área privada (protegida pelo middleware)
  components/
    navbar.jsx
    ui/                # componentes do shadcn/ui
  context/
    auth-context.jsx   # sessão/usuário (Context API)
    estoque-context.jsx# produtos e baixas compartilhados (Context API)
  hooks/
    useMetricasEstoque.js # cálculos das métricas (lógica reaproveitada)
  lib/
    auth.js            # sessão (cookie) + usuários (localStorage)
    validations.js     # schemas Zod de todos os formulários
    validations.test.js# testes dos schemas
    utils.js           # helper cn() do shadcn
  data/estoque.js      # dados mockados (semente do EstoqueContext)
  middleware.js        # proteção de rotas
```

## Observações

- Não há back-end: a lista de usuários fica no `localStorage` e a senha não é criptografada
  (é trabalho de front-end). Em produção isso ficaria em uma API com hash.
- Os dados de estoque são mockados em `src/data/estoque.js` e servem de semente para o
  `EstoqueContext`. A partir dele, registrar uma baixa **desconta** do estoque e todas as
  telas (visualização, cadastros, métricas, relatórios e dashboard) leem a mesma fonte,
  ficando coerentes entre si.
- O Next 16 emite um aviso sugerindo renomear `middleware` para `proxy`; o nome
  `middleware` foi mantido por ser o termo pedido no enunciado e ainda ser suportado.
