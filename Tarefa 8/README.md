# Tarefa 8 - Next.js: Hooks e Roteamento

## Objetivo

Criar uma aplicação em Next.js simulando um pequeno sistema de usuários, utilizando `useState`, `useEffect` e roteamento.

## O que foi criado

- Uma aplicação Next.js usando Pages Router.
- Navbar com navegação sem reload usando `Link`.
- Rotas:
  - `/` para Home.
  - `/usuarios` para lista de usuários.
  - `/usuarios/[id]` para detalhes do usuário.
  - `/sobre` para uma página simples.
- Dados mockados em um array de usuários.
- Carregamento da lista com `useState` e `useEffect`.
- Captura do ID da URL com `useRouter`.
- Busca do usuário no array mockado.
- Cleanup simples nos efeitos com `console.log`.

## Relação com a aula

A tarefa aplica Hooks e roteamento em uma SPA. O `useState` guarda os dados que aparecem na tela, enquanto o `useEffect` executa ações quando a página abre ou quando o ID da rota muda.

No Next.js, as rotas são criadas pela estrutura de arquivos dentro da pasta `pages`. Por isso, o arquivo `pages/usuarios/[id].js` representa a rota dinâmica `/usuarios/1`, `/usuarios/2` e assim por diante.

## Estrutura

```text
Tarefa 8/
├── package.json
├── README.md
├── pages/
│   ├── _app.js
│   ├── index.js
│   ├── sobre.js
│   └── usuarios/
│       ├── index.js
│       └── [id].js
├── src/
│   ├── components/
│   │   └── Navbar.js
│   └── data/
│       └── usuarios.js
└── styles/
    └── globals.css
```

## Como executar

Entre na pasta da tarefa:

```bash
cd "Tarefa 8"
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Depois, abra o endereço exibido no terminal.

Exemplo comum:

```text
http://localhost:3000/
```

Se a porta `3000` estiver ocupada, o Next.js poderá indicar outra porta.

## Aprendizados praticados

- Rotas com Pages Router do Next.js.
- Navegação sem recarregar a página com `Link`.
- Rota dinâmica com arquivo `[id].js`.
- Captura de parâmetro da URL com `useRouter`.
- `useState` para armazenar usuários e estados de carregamento.
- `useEffect` para carregar dados, reagir a mudanças no ID e executar cleanup.
