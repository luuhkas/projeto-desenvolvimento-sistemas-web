# Tarefa 4 - Validação com JavaScript

## Objetivo

Desenvolver uma interface simples que valida, em tempo real, o nome digitado pelo usuário, usando Tailwind CSS para os estilos e JavaScript puro para manipular o DOM.

## Arquivos

- `index.html`: estrutura da página, Tailwind via CDN e campo de entrada.
- `script.js`: seleção dos elementos, evento `input` e troca das classes de feedback.

## O que foi praticado

- selecionar elementos com `document.querySelector`;
- escutar a digitação do usuário com `addEventListener('input', ...)`;
- alterar texto com `textContent`;
- trocar classes do Tailwind com `classList`;
- validar se o nome tem menos de 3 caracteres.

## Como testar

Abra o arquivo `index.html` no navegador:

```bash
open "Tarefa 4/index.html"
```

Ao digitar menos de 3 caracteres, o campo fica com borda vermelha e mostra mensagem de erro. Com 3 caracteres ou mais, o campo fica com borda verde e mostra mensagem de sucesso.
