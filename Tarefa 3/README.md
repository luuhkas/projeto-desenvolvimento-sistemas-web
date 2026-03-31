# TechStore Tailwind - Novos Aprendizados Depois da Tarefa 2

## Introdução

Este README reúne apenas o que aprendi de novo ao refazer o projeto TechStore na tarefa 3. A base de HTML, semântica, imagens, navegação e responsividade inicial eu já tinha praticado na tarefa 2, então aqui foquei só no que mudou de verdade: usar Tailwind CSS no lugar de um arquivo CSS tradicional.

### Informações Sobre Esta Etapa
- **Projeto**: TechStore em Tailwind CSS
- **Plataforma**: macOS
- **Linguagens**: HTML5
- **Ferramenta de estilo**: Tailwind CSS via CDN
- **Editor**: VS Code
- **Navegador**: Safari

## 1. O que mudou da Tarefa 2 para a Tarefa 3

Na tarefa 2 eu escrevia estilos no `css/style.css`, criando seletores e organizando o visual em um arquivo separado. Na tarefa 3, passei a estilizar quase tudo diretamente no HTML com classes utilitárias do Tailwind.

Exemplo:

```html
<section class="py-12 md:py-[72px]">
```

- `py-12`: adiciona padding vertical.
- `md:py-[72px]`: em telas médias para cima, muda esse valor.
- Aprendizado novo: no Tailwind, muita coisa é montada combinando classes pequenas, em vez de criar regras CSS manualmente.

## 2. Como carregar o Tailwind sem instalar nada

Aprendi que dá para começar rápido usando o CDN:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

- Isso permite testar Tailwind sem `npm`, sem build e sem configurar projeto.
- Para exercício e estudo, isso agiliza bastante.
- Também entendi a limitação: em projetos maiores, o mais correto costuma ser instalar e compilar o Tailwind, em vez de depender só do CDN.

## 3. Configurando um tema próprio

Outro aprendizado importante foi que, mesmo usando CDN, ainda dá para personalizar cores e sombras:

```html
<script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    cream: '#fdf8f2',
                    accent: '#c96f2d',
                    accentDark: '#a8581f'
                },
                boxShadow: {
                    warm: '0 14px 36px rgba(91, 53, 29, 0.10)'
                }
            }
        }
    };
</script>
```

- `extend`: adiciona valores novos sem apagar os padrões do Tailwind.
- Aprendi que isso ajuda a manter consistência visual.
- Em vez de decorar códigos hexadecimais o tempo todo, posso usar nomes como `bg-accent`, `text-muted` e `shadow-warm`.

## 4. Pensar em utilidades em vez de seletores

Na tarefa 2 eu pensava assim:

- criar uma classe no HTML;
- ir ao CSS;
- escrever o seletor;
- testar o resultado.

Na tarefa 3, aprendi outro fluxo:

- pensar no efeito visual;
- procurar as utilidades prontas;
- combinar classes no próprio elemento.

Exemplo:

```html
<a href="produtos.html" class="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-accentDark">
    Ver produtos
</a>
```

Aprendizados novos aqui:

- `inline-flex` ajuda a alinhar conteúdo de botão.
- `rounded-xl` controla arredondamento sem criar CSS próprio.
- `transition` ativa transição de forma simples.
- `hover:*` facilita estados interativos sem escrever pseudo-classes manualmente.

## 5. Responsividade com prefixos

Eu já tinha feito layout responsivo antes, mas aqui aprendi um jeito mais direto de controlar isso:

```html
<div class="mx-auto grid w-[90%] max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(360px,520px)]">
```

- `md:` significa que a regra vale a partir do breakpoint médio.
- `grid` ativa CSS Grid.
- `md:grid-cols-[...]` mostra que Tailwind também aceita valores personalizados.

Esse foi um aprendizado importante: o Tailwind tem classes prontas, mas também permite sair do padrão quando preciso de uma medida específica.

## 6. Valores arbitrários

Uma coisa nova para mim foi o uso de colchetes:

```html
class="w-[90%] rounded-[28px] tracking-[0.02em]"
```

- `w-[90%]`: largura personalizada.
- `rounded-[28px]`: borda arredondada com valor exato.
- `tracking-[0.02em]`: espaçamento entre letras com medida personalizada.

Aprendi que isso evita criar CSS extra só para um detalhe isolado.

Ao mesmo tempo, percebi o cuidado necessário: se eu exagerar nesses valores arbitrários, o HTML pode ficar mais difícil de ler.

## 7. Estados visuais e feedback

Na tarefa 3 pratiquei melhor os estados de interação:

```html
class="transition duration-300 hover:-translate-y-1.5 hover:border-[#ddb08a] hover:shadow-warmHover"
```

Aprendi que:

- `duration-300` controla o tempo da animação.
- `hover:-translate-y-1.5` cria sensação de elevação.
- posso combinar mudança de borda, sombra e posição no mesmo elemento.

Isso deixou os cards mais vivos sem precisar escrever animações complexas.

## 8. Formularios com foco visual melhor

Na página de contato, aprendi a estilizar foco de campos de forma mais clara:

```html
class="w-full rounded-xl border border-borderWarm bg-slate-50 px-4 py-3 text-textMain outline-none transition focus:border-accent focus:ring-4 focus:ring-[rgba(201,111,45,0.16)]"
```

- `focus:border-accent`: muda a borda quando o campo recebe foco.
- `focus:ring-4`: cria um destaque visual ao redor.
- `outline-none`: remove o estilo padrão do navegador.

O aprendizado novo foi entender que foco visual não é só estética; ele também melhora a experiência de uso do formulário.

## 9. O que percebi sobre organização

Tailwind acelerou muito a construção visual, mas também me mostrou um tradeoff:

- fica mais rápido montar interface;
- o HTML cresce bastante;
- repetir muitas classes pode cansar;
- se eu repetir a mesma configuração em várias páginas, vale pensar em componentização ou em uma estrutura mais centralizada.

No meu caso, repeti o bloco `tailwind.config` em mais de um arquivo. Para estudo funcionou, mas aprendi que em projeto real eu tentaria evitar essa duplicação.

## 10. Diferença prática entre CSS tradicional e Tailwind

Depois de terminar a tarefa 3, minha conclusão foi:

- **CSS tradicional** me ajuda a separar melhor estrutura e estilo.
- **Tailwind** me ajuda a prototipar e ajustar interface com mais velocidade.

O aprendizado novo não foi só "como usar Tailwind", mas quando ele faz sentido:

- para telas e componentes rápidos, ele é muito produtivo;
- para projetos grandes, a organização precisa ser pensada com cuidado.

## Conclusão

Depois da tarefa 2, o principal avanço da tarefa 3 foi aprender uma nova forma de estilizar interfaces. Eu deixei de pensar apenas em seletores e arquivos CSS separados e comecei a pensar em composição de utilidades, breakpoints, estados e tema reutilizável.

Ou seja: não aprendi novamente HTML e CSS do zero. O que aprendi de fato foi um novo fluxo de trabalho com Tailwind CSS, com vantagens de velocidade, consistência visual e responsividade, mas também com cuidados de organização para não deixar o HTML excessivamente carregado.
