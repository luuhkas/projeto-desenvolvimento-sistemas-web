# Sistema de Estoque — Back-end (API REST)

API REST do Sistema de Estoque, desenvolvida com **Node.js + Fastify + Prisma + SQLite**.

## Tecnologias
- **Node.js** (ESM)
- **Fastify** — servidor e rotas
- **Prisma ORM + SQLite** — acesso e persistência de dados
- **Zod** — validação dos dados de entrada
- **@fastify/jwt + bcrypt** — autenticação (token) e hash de senha
- **Swagger UI** — documentação e teste dos endpoints em `/docs`

## Como rodar

Pré-requisito: **Node.js 18+**.

```bash
npm install
cp .env.example .env        # ajuste o JWT_SECRET se quiser
npx prisma migrate dev      # cria o banco SQLite e gera o Prisma Client
npm run dev                 # sobe a API em http://localhost:3000
```

- API: http://localhost:3000
- Documentação / testes: http://localhost:3000/docs

## Principais rotas
- `POST /auth/register`, `POST /auth/login` — cadastro e login (devolve token JWT)
- `GET/POST/PUT/DELETE /produtos` — CRUD de produtos (escrita exige token)
- `GET/POST /baixas` — saídas de estoque (a baixa desconta do produto)
- `GET /usuarios` — lista de usuários (exige token)

## Integração com o front-end
O front-end (Next.js) está na pasta `../Trabalho` deste mesmo repositório. Para ver a
integração, rode também o front:

```bash
cd ../Trabalho
npm install
npm run dev                 # front em http://localhost:3001 (consome esta API)
```
