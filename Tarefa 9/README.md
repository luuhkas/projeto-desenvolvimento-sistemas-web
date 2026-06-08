# Tarefa 9 - API de Filmes com Node.js e Fastify

## Objetivo

Desenvolver uma API utilizando `Node.js` e `Fastify`, aplicando rotas HTTP, parametros de rota, query parameters, organizacao de rotas, middleware com hooks, consumo de API externa e tratamento de erros.

## Enunciado recebido

A atividade pede uma API de filmes com as seguintes rotas:

- `GET /`
  - Retornar uma mensagem simples informando que a API esta funcionando.
- `GET /filmes`
  - Buscar e retornar uma lista de filmes usando uma API publica de filmes.
- `GET /filmes/:id`
  - Receber o ID do filme pela URL e retornar os detalhes do filme.
- `GET /busca?q=valor`
  - Permitir pesquisar filmes pelo nome usando query parameters.

## Middleware de log

Criar um hook que registre no terminal:

- metodo HTTP;
- URL acessada;
- horario da requisicao.

## Tratamento de erros

Usar `try/catch` ao consumir a API externa e retornar uma mensagem amigavel caso ocorra erro.

## Materiais de apoio do professor

Para esta tarefa, a prioridade e usar as ferramentas e padroes apresentados no material da aula:

- Node.js;
- Fastify;
- documentacao do Fastify;
- plugins do Fastify;
- rotas, middlewares e APIs;
- design de API REST.

## O que foi criado

- Servidor HTTP com `Fastify`.
- Carregamento automatico das rotas com `@fastify/autoload`.
- Plugin `@fastify/sensible` para erros HTTP, como `404`.
- Plugin `@fastify/cors`.
- Swagger UI com `@fastify/swagger` e `@fastify/swagger-ui` para testar a API em uma interface web.
- Schemas do Fastify para validar parametros, query strings e padronizar respostas.
- Hook `onRequest` para registrar metodo, URL e horario no terminal.
- Consumo da API publica Studio Ghibli API.
- Tratamento de erro com `try/catch` ao consultar a API externa.
- Rotas organizadas em arquivos separados.

## API externa usada

Foi usada a Studio Ghibli API:

```text
https://ghibliapi.dev/films
```

A escolha foi feita porque a API e publica, possui endpoint de filmes e nao exige chave de acesso.

## Estrutura

```text
Tarefa 9/
├── abrir_tarefa_9.command
├── package-lock.json
├── package.json
├── README.md
└── src/
    ├── app.js
    ├── server.js
    ├── plugins/
    │   └── requestLogger.js
    ├── routes/
    │   ├── filmes.js
    │   └── home.js
    ├── schemas/
    │   └── movieSchemas.js
    └── services/
        └── ghibliApi.js
```

## Como executar

Entre na pasta da tarefa:

```bash
cd "Tarefa 9"
```

Instale as dependencias:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

Tambem existe o modo de desenvolvimento:

```bash
npm run dev
```

Por padrao, a API abre em:

```text
http://127.0.0.1:3000
```

A interface de validacao das rotas abre em:

```text
http://127.0.0.1:3000/docs
```

Se quiser usar outra porta:

```bash
PORT=3333 npm start
```

No macOS, tambem e possivel iniciar com dois cliques:

```text
abrir_tarefa_9.command
```

## Exemplos para testar

Pelo navegador, acesse a documentacao interativa:

```text
http://127.0.0.1:3000/docs
```

Ou teste via terminal:

```bash
curl http://127.0.0.1:3000/
```

```bash
curl http://127.0.0.1:3000/filmes
```

```bash
curl http://127.0.0.1:3000/busca?q=totoro
```

```bash
curl http://127.0.0.1:3000/filmes/58611129-2dbc-4a81-a72f-77ddfc1b1b49
```

## Prints sugeridos para o PDF

- Terminal mostrando `npm start`.
- Swagger UI aberto em `/docs`.
- Navegador ou Postman/Insomnia acessando `GET /`.
- Navegador ou Postman/Insomnia acessando `GET /filmes`.
- Navegador ou Postman/Insomnia acessando `GET /busca?q=totoro`.
- Navegador ou Postman/Insomnia acessando `GET /filmes/:id`.
- Terminal mostrando o hook com `metodo`, `url` e `horario`.

## Entrega esperada

Enviar o link do GitHub contendo o projeto e um PDF com:

1. Estrutura das pastas.
2. Prints das rotas funcionando.
3. Print do middleware registrando logs.
4. Print da integracao com a API de filmes.
