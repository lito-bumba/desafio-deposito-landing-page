# MetaCerta - Landing Page

Uma landing page moderna, responsiva e de alta conversão para o aplicativo **MetaCerta** (disponível para Android e iOS). O aplicativo ajuda os usuários a criarem metas de poupança personalizadas e realizarem depósitos visando alcançar seus objetivos financeiros.

Este site foi projetado com uma estética **Premium Dark Mode**, destacando a cor primária do aplicativo (`#4CD964`) em contraste com tons profundos e elegantes, aplicando técnicas modernas como *Glassmorphism* (efeito de vidro fosco) e animações on-scroll.

---

## ✨ Funcionalidades da Landing Page

* **Apresentação de Impacto:** Hero section com chamada de conversão clara e mockup realista do aplicativo.
* **Seção de Funcionalidades:** Destaque para a criação de metas, realização de depósitos e acompanhamento de progresso.
* **Metas Pré-definidas Interativas:** Cards visuais demonstrando metas comuns (Viagem, Reserva de Emergência, Carro Novo) com barras de progresso simuladas.
* **Política de Privacidade Integrada:** Página separada ([privacy.html](privacy.html)) com toda a regulamentação necessária para publicação e conformidade do app nas lojas.
* **Responsividade Completa:** Otimizado para dispositivos móveis, tablets e desktops (Mobile First).
* **Animações Fluidas:** Efeitos visuais dinâmicos conforme o usuário navega pela página.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica para melhor SEO e acessibilidade.
* **CSS3 (Vanilla):** Estilização personalizada, variáveis globais, layouts em Flexbox/Grid, efeitos de vidro e micro-animações.
* **JavaScript (ES6):** Manipulação da Navbar (sticky), Menu Mobile e lógica de scroll reveal com a API nativa `IntersectionObserver`.
* **Vite:** Ferramenta de build rápida para servir o ambiente de desenvolvimento local e otimizar os arquivos para produção.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/lito-bumba/desafio-deposito-landing-page.git
   cd desafio-deposito-landing-page
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   *O site estará disponível por padrão em `http://localhost:5173`.*

---

## 📦 Build para Produção

Para gerar os arquivos otimizados e minificados prontos para serem publicados em qualquer servidor estático (como Vercel, Netlify ou GitHub Pages):

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `/dist`.
