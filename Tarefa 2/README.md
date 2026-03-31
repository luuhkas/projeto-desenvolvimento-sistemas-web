# TechStore - Minhas Anotações de Aprendizado em Desenvolvimento Web

## Introdução

Este documento são minhas anotações pessoais sobre o projeto TechStore, um website simples para uma loja fictícia de acessórios eletrônicos. Estava muito tempo sem estudar HTML/CSS, e aproveitei este projeto para relembrar e aprofundar. A cada etapa anotei o que fazia e por quê. O foco foi criar um site limpo, responsivo e acessível.

### Informações Sobre Este Projeto
- **Plataforma**: macOS
- **Linguagens**: HTML5, CSS3
- **Editor**: VS Code
- **Navegador**: Safari

> **Nota Importante**: Todos os comandos e instruções neste documento são para macOS. Se você usa Windows ou Linux, adapte os comandos conforme necessário. Exemplos:
> - macOS: `open index.html` | Windows: `start index.html` | Linux: `xdg-open index.html`
> - macOS: `rm arquivo` | Windows: `del arquivo` | Linux: `rm arquivo`

### O que Preciso para Começar
- Editor de texto (usei VS Code).
- Navegador web.
- Terminal básico (comandos como mkdir, cd).

Se você é iniciante como eu era, siga as anotações passo a passo.

## 1. Preparando o Projeto

### Criando Pastas
No terminal, criei a estrutura:

```bash
mkdir TechStore
cd TechStore
mkdir css img
```

- `mkdir`: Cria pastas.
- `cd`: Entra na pasta.
- Por quê? Separei CSS e imagens para organização. Evita arquivos misturados.

### Criando Arquivos
Criei os HTMLs:

```bash
touch index.html produtos.html contato.html
```

- `touch`: Arquivos vazios.
- Por quê? Começo vazio e vou preenchendo.

E o CSS:

```bash
touch css/style.css
```

Pronto para editar.

## 2. Estrutura HTML Básica

### O que é HTML?
HTML estrutura páginas web com tags como `<p>`.

### index.html - Base
Comecei com o template padrão:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechStore - Início</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Aqui vai o conteúdo -->
</body>
</html>
```

- `<!DOCTYPE html>`: Diz ao navegador que é HTML5.
- `<html lang="pt-BR">`: Idioma português, bom para acessibilidade.
- `<head>`: Metadados.
  - `<meta charset="UTF-8">`: Suporte a acentos.
  - `<meta name="viewport"...>`: Responsivo em mobile.
  - `<title>`: Título na aba.
  - `<link>`: Liga o CSS.
- `<body>`: Conteúdo visível.
- Por quê? Base essencial. Sem isso, página não funciona.

### Header e Navegação
Adicionei no body:

```html
<header>
    <div class="container">
        <h1 class="logo">TechStore</h1>
        <nav>
            <ul>
                <li><a href="index.html" class="active">Início</a></li>
                <li><a href="produtos.html">Produtos</a></li>
                <li><a href="contato.html">Contato</a></li>
            </ul>
        </nav>
    </div>
</header>
```

- `<header>`: Semântico para topo.
- `<h1>`: Título principal (um por página).
- `<nav>`: Navegação.
- `<ul><li>`: Lista de links.
- `<a href>`: Links. `class="active"` para página atual.
- Por quê? Semântica ajuda SEO e acessibilidade.

### Hero Section
Depois do header:

```html
<main>
    <section class="hero">
        <div class="container hero-content">
            <div class="hero-text">
                <h2>Os melhores acessórios eletrônicos para seu dia a dia</h2>
                <p>Tecnologia, qualidade e praticidade...</p>
                <a href="produtos.html" class="btn">Ver produtos</a>
            </div>
            <div class="hero-image">
                <img src="img/index_hero.jpg" alt="Mesa com notebook...">
            </div>
        </div>
    </section>
</main>
```

- `<main>`: Conteúdo principal.
- `<section>`: Grupo relacionado.
- `<h2>`: Subtítulo.
- `<p>`: Texto.
- `<a class="btn">`: Botão.
- `<img>`: Imagem com `alt` para acessibilidade.
- Por quê? Hero é o destaque. Estrutura organizada.

### Produtos em Destaque
Adicionei section:

```html
<section>
    <div class="container">
        <h2 class="section-title">Produtos em destaque</h2>
        <div class="cards">
            <article>
                <img src="img/fone_bluetooth.jpg" alt="Fone...">
                <h3>Fone Bluetooth</h3>
                <p>Som de qualidade...</p>
                <span class="price">R$ 299</span>
            </article>
            <!-- Mais produtos -->
        </div>
    </div>
</section>
```

- `<article>`: Item independente.
- `<span class="price">`: Preço destacado.
- Por quê? Semântico para produtos.

Repeti para outras páginas.

## 3. CSS - Estilizando

### O que é CSS?
CSS estiliza HTML, selecionando elementos e aplicando aparência.

### Reset e Variáveis
No style.css:

```css
/* RESET */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* VARIÁVEIS */
:root {
    --bg: #f7f1ea;
    --surface: #ffffff;
    --text: #2f241d;
    --primary: #c96f2d;
    --shadow: 0 14px 36px rgba(91, 53, 29, 0.10);
}

body {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(180deg, #fdf8f2 0%, #f6ede3 100%);
    color: var(--text);
    line-height: 1.6;
}
```

- `*`: Reset universal.
- `margin: 0; padding: 0;`: Remove padrões.
- `box-sizing: border-box;`: Largura inclui tudo.
- `:root`: Variáveis globais.
- `var(--bg)`: Usa variável.
- `font-family`: Fonte com fallbacks.
- `background: linear-gradient`: Fundo gradiente.
- `line-height: 1.6`: Espaçamento texto.
- Por quê? Reset consistente. Variáveis facilitam mudanças.

### Container
```css
.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}
```

- `width: 90%`: Responsivo.
- `max-width: 1200px`: Limite.
- `margin: 0 auto`: Centraliza.
- Por quê? Controla layout.

### Header
```css
header {
    background-color: rgba(255, 255, 255, 0.92);
    padding: 18px 0;
    position: sticky;
    top: 0;
    backdrop-filter: blur(10px);
    z-index: 10;
}

header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    color: var(--primary);
    font-size: 1.7rem;
}

header nav ul {
    display: flex;
    gap: 10px;
}

header nav a {
    color: var(--text);
    padding: 10px 14px;
    border-radius: 999px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

header nav a:hover {
    color: var(--primary);
    background-color: var(--primary-soft);
}

header nav a.active {
    background-color: var(--primary);
    color: #ffffff;
}
```

- `position: sticky; top: 0;`: Fica no topo ao rolar.
- `backdrop-filter: blur(10px);`: Blur elegante.
- `display: flex; justify-content: space-between;`: Alinha logo e nav.
- `gap: 10px;`: Espaço.
- `transition`: Anima hover.
- `border-radius: 999px;`: Bordas redondas.
- Por quê? Flexbox moderno. Transições suaves.

### Hero
```css
.hero {
    padding: 72px 0 40px;
}

.hero-content {
    display: flex;
    align-items: center;
    gap: 40px;
}

.hero-text {
    flex: 1;
}

.hero-image {
    flex: 1;
    text-align: center;
}

.hero-image img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: var(--shadow);
}
```

- `display: flex;`: Lado a lado.
- `flex: 1;`: Igual espaço.
- `max-width: 100%; height: auto;`: Responsivo.
- `box-shadow`: Sombra.
- Por quê? Layout flexível.

### Cards
```css
.cards {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
}

.cards article {
    background: var(--surface);
    padding: 20px;
    border-radius: 12px;
    box-shadow: var(--shadow);
    text-align: center;
    transition: transform 0.3s ease;
    flex: 1 1 300px;
    max-width: 350px;
}

.cards article:hover {
    transform: translateY(-5px);
}

.cards img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 15px;
}

.price {
    color: var(--primary);
    font-weight: bold;
    font-size: 1.2rem;
}
```

- `flex-wrap: wrap;`: Quebra linha.
- `flex: 1 1 300px;`: Mínimo 300px.
- `object-fit: cover;`: Ajusta imagem.
- `transform: translateY(-5px);`: Eleva no hover.
- Por quê? Grid responsivo.

### Botão
```css
.btn {
    display: inline-block;
    background: var(--primary);
    color: #ffffff;
    padding: 12px 24px;
    border-radius: 999px;
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background: var(--primary-dark);
}
```

- `display: inline-block;`: Como botão.
- Por quê? Estilo CTA.

### Formulário
```html
<form class="form">
    <label for="nome">Nome:</label>
    <input type="text" id="nome" name="nome" required>
    <button type="submit">Enviar</button>
</form>
```

```css
.form {
    max-width: 600px;
    margin: 0 auto;
}

.form label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
}

.form input, .form textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--border);
    border-radius: 8px;
    margin-bottom: 15px;
}

.form button {
    background: var(--primary);
    color: #ffffff;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.form button:hover {
    background: var(--primary-dark);
}
```

- `required`: Validação.
- `cursor: pointer;`: Indica clique.
- Por quê? Labels essenciais.

## 4. Responsividade
Adicionei no final:

```css
@media (max-width: 768px) {
    .hero-content {
        flex-direction: column;
    }
    
    .cards {
        flex-direction: column;
        align-items: center;
    }
    
    header .container {
        flex-direction: column;
        gap: 15px;
    }
}
```

- `@media`: Para telas pequenas.
- `flex-direction: column;`: Empilha.
- Por quê? Mobile-first.

## 5. Imagens
- Procurei imagens compatíveis com o projeto e salvei os arquivos manualmente na pasta `img`.
- Renomeei com `mv img/antigo.jpg img/novo.jpg`.
- Por quê? Locais carregam rápido.

## 6. Testes
- Abri no navegador com `open index.html`.
- Verifiquei erros no console.

## 7. Lições Aprendidas
- **Semântica**: Tags certas para acessibilidade.
- **Organização**: Pastas separadas.
- **Responsividade**: Sempre testar.
- **Acessibilidade**: Alt e labels.
- **Manutenção**: Variáveis e comentários.

## Conclusão
Este projeto me ensinou web dev básico. Agora sei HTML, CSS, responsividade. Futuramente, adicionarei JS. Anotações completas para revisar!

---

*Minhas notas de março de 2026.*
