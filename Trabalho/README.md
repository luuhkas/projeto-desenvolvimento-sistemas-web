# Trabalho - Sistema de Estoque

Trabalho da disciplina de Projeto e Desenvolvimento de Sistemas Web. Front-end de um sistema de estoque feito em Next.js + React.

## Como rodar

```
npm install
npm run dev
```

Abrir em http://localhost:3000.

## Login de teste

- email: admin@estoque.com
- senha: 123456

Também dá pra criar conta nova na tela de cadastro.

## O que tem no sistema

Páginas públicas: home, sobre, contato, login e cadastro.

Área privada (precisa estar logado): dashboard, gerenciamento de usuários, convite de usuário, e o módulo de estoque com visualização, baixas, cadastros, métricas e relatórios.

São 13 rotas de tela no total.

## Como o login funciona

Não tem back-end. Os usuários ficam salvos no localStorage do navegador, junto com a sessão de quem está logado. Quando o usuário tenta acessar uma rota privada sem estar logado, o componente `RotaPrivada` percebe e redireciona pro /login.

Tudo isso está centralizado no `AuthContext` (src/context/AuthContext.js), que tem as funções de login, cadastro e logout. Cada página privada é envolvida pelo `RotaPrivada` (src/components/RotaPrivada.js).

## Stack

- Next.js 16 (Pages Router)
- React 19 (hooks: useState, useEffect, useContext)
- CSS puro (styles/globals.css)

Sem libs externas além do Next/React.

## Observações

- A senha fica em texto puro no localStorage só porque é trabalho de front-end. Em um sistema real teria back-end com hash.
- Os dados de estoque são mockados em src/data/estoque.js.
