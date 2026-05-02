# Tarefa 7 - React: Contador com Limites e Step

## Objetivo

Criar um componente React de contador com controle completo, usando `useState` para gerenciar o valor atual, o step e os limites mínimo e máximo.

## O que foi criado

- Uma aplicação React com Vite.
- Um contador iniciado em `0`.
- Botões para incrementar, decrementar e resetar.
- Inputs numéricos para configurar:
  - `step`
  - valor mínimo
  - valor máximo
- Validação para impedir que o contador passe do máximo ou fique abaixo do mínimo.
- Ajuste automático do contador quando os limites são alterados.
- Componentes reutilizáveis:
  - `CampoNumero`
  - `PainelResumo`

## Relação com a aula

A aula apresentou props, estado, componentes e `useState`. Esta tarefa aplica esses conceitos em uma interface interativa:

- o estado guarda dados que mudam ao longo do tempo;
- `setState` atualiza os valores e causa re-renderização automática;
- os inputs são controlados pelo estado;
- os componentes recebem dados por props;
- a tela é atualizada de forma declarativa, sem manipulação manual do DOM.

## Como o contador funciona

O componente principal guarda quatro estados:

```jsx
const [contador, setContador] = useState(0);
const [step, setStep] = useState(1);
const [minimo, setMinimo] = useState(0);
const [maximo, setMaximo] = useState(10);
```

Ao incrementar, o contador soma o valor do `step`, mas usa uma função de limite para não passar do máximo. Ao decrementar, subtrai o `step`, mas não deixa o valor ficar abaixo do mínimo.

O reset volta para `0`. Se o mínimo configurado for maior que `0`, o reset volta para o próprio mínimo, seguindo o requisito do exercício.

## Validações implementadas

- `step` sempre fica maior que `0`, aceitando valores decimais positivos.
- Se o mínimo digitado ficar maior que o máximo atual, o máximo é ajustado para o mesmo valor.
- Se o máximo digitado ficar menor que o mínimo atual, o mínimo é ajustado para o mesmo valor.
- Se o contador sair do intervalo depois de uma mudança nos limites, ele é corrigido automaticamente.

## Estrutura

```text
Tarefa 7/
├── abrir_tarefa_7.command
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    └── components/
        ├── CampoNumero.jsx
        └── PainelResumo.jsx
```

## Como executar

Esta tarefa não deve ser aberta diretamente pelo arquivo `index.html`, porque o navegador não entende JSX sozinho. O Vite precisa transformar os arquivos React antes de exibir a página.

Entre na pasta da tarefa:

```bash
cd "Tarefa 7"
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

No macOS, também é possível iniciar a tarefa com dois cliques no arquivo:

```text
abrir_tarefa_7.command
```

Esse arquivo entra automaticamente na pasta da tarefa, executa `npm install` e depois inicia o servidor com `npm run dev`.

## Aprendizados praticados

- `useState` para controlar dados internos do componente.
- Inputs controlados em React.
- Props para reaproveitar componentes.
- Funções auxiliares para evitar repetição de lógica.
- Validação de estado antes de atualizar a interface.
- Re-renderização automática após mudanças de estado.
