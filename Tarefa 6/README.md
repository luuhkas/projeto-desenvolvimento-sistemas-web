# Tarefa 6 - React: Introdução, Componentes e JSX

## Objetivo

Criar um app simples em React para praticar componentes reutilizáveis, JSX e navegação em uma SPA com pelo menos três páginas.

## O que foi criado

- Uma aplicação React com Vite.
- Navegação interna entre três páginas: `Início`, `Perfil` e `Habilidades`.
- Componentes reutilizáveis:
  - `Header`
  - `CardPerfil`
  - `ListaHabilidades`
- Uso de JSX com `className`, expressões entre `{}`, props, estado com `useState`, renderização condicional e listas com `map()` e `key`.

## Relação com a aula

O PDF da aula apresentou React como uma biblioteca JavaScript para construção de interfaces, usando componentes funcionais, composição, SPA e JSX. Esta tarefa aplica esses pontos criando uma interface declarativa, em que a tela muda conforme o estado `paginaAtual`, sem manipular o DOM manualmente.

## Componentes criados

### Header

O componente `Header` renderiza o topo da página e os botões de navegação. Ele recebe por props a página atual e a função responsável por trocar a página exibida.

### CardPerfil

O componente `CardPerfil` exibe as informações principais do perfil. Ele recebe um objeto `perfil` por props, o que permite reutilizar o mesmo componente com outros dados se necessário.

### ListaHabilidades

O componente `ListaHabilidades` recebe um array de habilidades e usa `map()` para renderizar a lista. Cada item possui uma `key` única, seguindo a prática recomendada em listas no React.

## Como a navegação funciona

A aplicação usa `useState` para armazenar a página atual. Ao clicar em um botão do `Header`, o estado é atualizado e o conteúdo dentro de `<main>` muda entre `Início`, `Perfil` e `Habilidades`, sem recarregar o navegador.

## Estrutura

```text
Tarefa 6/
├── abrir_tarefa_6.command
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── assets/
    │   └── profile_avatar.png
    ├── components/
    │   ├── CardPerfil.jsx
    │   ├── Header.jsx
    │   └── ListaHabilidades.jsx
    └── data/
        └── perfil.js
```

## Como executar

Esta tarefa não deve ser aberta diretamente pelo arquivo `index.html`, porque o navegador não entende JSX sozinho. O Vite precisa transformar os arquivos React antes de exibir a página.

Opção 1: pelo terminal, entre na pasta da tarefa:

```bash
cd "Tarefa 6"
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
http://127.0.0.1:5173/
```

Se a porta `5173` estiver ocupada, o Vite mostrará outra porta, como `5174`.

Opção 2: no macOS, dê dois cliques no arquivo:

```text
abrir_tarefa_6.command
```

Ele executa `npm install` e inicia o servidor de desenvolvimento automaticamente.

## Aprendizados praticados

- Componentes React devem começar com letra maiúscula.
- JSX parece HTML, mas usa diferenças como `className`.
- Props permitem reutilizar componentes com dados diferentes.
- `useState` permite controlar qual página está visível.
- `map()` transforma arrays em elementos JSX.
- Cada item de lista precisa de uma `key` única.
