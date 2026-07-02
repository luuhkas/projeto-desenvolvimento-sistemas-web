# Sistema de Estoque — API (back-end)

API REST do Sistema de Estoque, feita com **Node.js + Fastify + Prisma + SQLite**.
O sistema é dividido em **três serviços independentes**, cada um na sua porta:

| Serviço | Pasta | Porta |
|---|---|---|
| Front-end (Next.js) | `../Trabalho` | 3000 |
| **API principal (este projeto)** | `../Trabalho-Backend` | **8080** |
| Microsserviço de e-mail | `../Trabalho-Email` | 8000 |

Esta API cuida do estoque, da autenticação e das regras de negócio. Quando precisa
enviar um e-mail (convite ou balanço diário), ela chama o microsserviço de e-mail por HTTP.

## Tecnologias
- **Node.js** (ESM) + **Fastify** — servidor e rotas
- **Prisma ORM + SQLite** — acesso e persistência de dados
- **Zod** — validação dos dados de entrada
- **@fastify/jwt + bcrypt** — autenticação (JWT) e hash de senha
- **ABAC** (controle de acesso por atributo) — políticas em `src/auth/policies.js`
- **@fastify/rate-limit** — limite de tentativas no login
- **deep-email-validator** — recusa e-mail de domínio inexistente (checa registros MX)
- **node-cron** — rotina automática de balanço diário
- **Swagger UI** — documentação e teste dos endpoints em `/docs`

## Como rodar o sistema completo (3 terminais)

Pré-requisito: **Node.js 18+**.

**Terminal 1 — Microsserviço de e-mail (porta 8000)**
```bash
cd Trabalho-Email
npm install
cp .env.example .env        # preencha o SMTP do Gmail (ver README dessa pasta)
npx prisma migrate dev
npm run dev
```

**Terminal 2 — API principal (porta 8080)**
```bash
cd Trabalho-Backend
npm install
cp .env.example .env        # ajuste o JWT_SECRET se quiser
npx prisma migrate dev      # cria o banco e gera o Prisma Client
npm run seed                # cria o admin e produtos de exemplo
npm run dev
```

**Terminal 3 — Front-end (porta 3000)**
```bash
cd Trabalho
npm install
npm run dev                 # abre http://localhost:3000
```

- API: http://localhost:8080
- Documentação / testes (Swagger): http://localhost:8080/docs

## Credenciais de teste
Depois de rodar `npm run seed`:

- **admin@estoque.com** / **123456** — papel **Super Admin**

## Controle de acesso (ABAC)
Três papéis: **Super Admin > Admin > Operador**. As decisões não olham só o papel —
combinam atributos (papel de quem pede + dono do recurso + horário). A função central é
`pode()` em `src/auth/policies.js`, aplicada nas rotas com `app.autorizar('acao')`.
Exemplos: remover produto é só do Super Admin; o Operador só registra baixa em horário
comercial (8h–18h). Ação sem permissão devolve **403**.

## Principais rotas
- `POST /auth/register`, `POST /auth/login` — cadastro/login (JWT). O login é limitado a **5 tentativas por minuto**.
- `GET/POST/PUT/DELETE /produtos` — CRUD. A listagem tem **paginação, filtro e ordenação**; a escrita exige Admin (remover exige Super Admin).
- `GET/POST /baixas` — saídas de estoque. A baixa **desconta de forma atômica** (evita saldo negativo em acessos simultâneos).
- `GET /usuarios` — usuários (Admin+).
- `POST /convites`, `GET /convites/:token`, `POST /convites/:token/aceitar` — convites por e-mail (token único, validade e uso único).
- `GET /relatorios/*` — `resumo`, `mais-movimentados`, `por-categoria`, `baixo-estoque`, `movimentacoes`, `previsao` (Admin+).
- `GET/PUT /backoffice/rotina`, `POST /backoffice/rotina/disparar`, `GET /backoffice/emails` — backoffice (só Super Admin).

## Inteligência e automação
- **Previsão de ruptura** (`/relatorios/previsao`): calcula o consumo médio diário de cada
  produto e estima em quantos dias o estoque acaba, classificando em crítico / alerta / ok.
- **Balanço diário** (`node-cron`): todo dia, num horário configurável pelo backoffice,
  gera um balanço do estoque e envia por e-mail a **todos os admins** (passa pelo
  microsserviço de e-mail).

## Variáveis de ambiente (`.env`)
```
PORT="8080"
DATABASE_URL="file:./dev.db"
JWT_SECRET="troque-por-um-valor-aleatorio"
APP_URL="http://localhost:3000"            # front, para montar o link do convite
EMAIL_SERVICE_URL="http://localhost:8000"  # microsserviço de e-mail
CONVITE_VALIDADE_HORAS="48"
```

## Organização do código
```
src/
  server.js            # sobe o servidor
  app.js               # monta a aplicação (plugins, rotas, tratamento de erro, cron)
  auth/policies.js     # políticas ABAC (função pode)
  plugins/             # prisma, jwt/ABAC, swagger, jobs (cron do balanço)
  routes/              # auth, produtos, baixas, usuarios, convites, relatorios, backoffice
  schemas/             # validações Zod
  services/            # regras de negócio + acesso ao banco (+ mailer, emailValidator)
prisma/
  schema.prisma        # modelos: Usuario, Produto, Baixa, Convite, RotinaConfig, Email(log no serviço)
  seed.js              # admin + produtos de exemplo + config da rotina
```
