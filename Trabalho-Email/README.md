# Sistema de Estoque — Microsserviço de e-mail

Serviço independente que tem uma única responsabilidade: **enviar e-mails** (via Gmail/SMTP)
e **guardar um log** de tudo que foi enviado. Roda na **porta 8000**. A API principal
(`../Trabalho-Backend`) o chama por HTTP quando precisa disparar um convite ou o balanço diário.

Manter isso separado deixa o sistema desacoplado: se o serviço de e-mail cair, a API não
cai junto (o envio só fica registrado como falha).

## Tecnologias
- **Node.js** (ESM) + **Fastify**
- **nodemailer** — envio de e-mail por SMTP
- **Prisma ORM + SQLite** — log dos e-mails (tabela `Email`)

## Como rodar
```bash
npm install
cp .env.example .env        # preencha o SMTP do Gmail (ver abaixo)
npx prisma migrate dev
npm run dev                 # http://localhost:8000
```

## Rotas
- `POST /emails` — recebe `{ para, assunto, html }`, envia o e-mail e registra no log.
- `GET /emails` — lista os e-mails enviados (usado pelo backoffice da API).

## Configurar o envio pelo Gmail (App Password)
Para enviar de verdade, o `.env` precisa de uma conta Gmail com **verificação em 2 etapas**
ativa e uma **Senha de app**:

1. Ative a **verificação em 2 etapas** em `myaccount.google.com` → Segurança.
2. Gere uma **Senha de app** em `myaccount.google.com/apppasswords` (o Google mostra 16 letras).
3. Preencha o `.env`:
```
PORT="8000"
DATABASE_URL="file:./emails.db"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="seuemail@gmail.com"
SMTP_PASS="as16letrasdaapppassword"    # sem espaços
MAIL_FROM="Estoque+ <seuemail@gmail.com>"
```

O `.env` (com a senha) está no `.gitignore` e não vai para o repositório. Sem preencher o
SMTP, o serviço sobe normalmente, mas os envios ficam registrados como `falhou`.
