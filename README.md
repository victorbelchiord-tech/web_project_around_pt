# Tripleten web_project_around_pt

# 📸 Around The U.S.

> Uma plataforma interativa e responsiva para entusiastas de viagens compartilharem momentos e explorarem paisagens icônicas.

---

## 📌 Índice

1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Tech Stack](#%EF%B8%8F-tech-stack)
3. [Funcionalidades Principais](#-funcionalidades-principais)
4. [Arquitetura de Arquivos](#-arquitetura-de-arquivos)
5. [Regras de Validação Implementadas](#%EF%B8%8F-regras-de-valida%C3%A7%C3%A3o-implementadas)

---

## 📖 Sobre o Projeto

O **Around The U.S.** é uma aplicação web interativa baseada em um modelo do Figma. O projeto resolve o problema do compartilhamento rápido de imagens e gerenciamento de perfil do usuário de forma local e assíncrona na tela. Ele utiliza conceitos avançados de manipulação do DOM (Document Object Model) e escutas de eventos em tempo real para proporcionar interatividade sem a necessidade de recarregar a página.

---

## 🛠️ Tech Stack

| Camada          | Tecnologia               | Propósito                                                          |
| :-------------- | :----------------------- | :----------------------------------------------------------------- |
| **Estrutura**   | HTML5 Semântico          | Organização de modais, inputs e seções acessíveis.                 |
| **Estilização** | CSS3 (Metodologia BEM)   | Layout responsivo em Grid/Flexbox e modularização.                 |
| **Lógica**      | JavaScript Vanilla (ES6) | Validação nativa de formulários e gerenciamento de estados do DOM. |

---

## ✨ Funcionalidades Principais

- **Gerenciamento de Perfil:** Edição de Nome e Descrição com atualização dinâmica na tela.
- **Galeria Interativa:** Adição de novos cartões de viagem contendo título e link de imagem válido.
- **Validação em Tempo Real:** Inputs monitorados via JavaScript com bloqueio inteligente do botão de envio (`Submit`) e alteração visual da borda inferior em caso de erro.
- **Acessibilidade Avançada UX:** Fechamento de modais de forma intuitiva clicando fora do conteúdo (Overlay) ou pressionando a tecla `Esc`.
- **Interações Dinâmicas:** Sistema de curtidas com alteração visual de ícone e exclusão de cartões em tempo real.

---

## 📐 Arquitetura de Arquivos

A estrutura do projeto foi padronizada de forma modular para fácil manutenção do código:

Plaintext
around-the-us/
├── index.html # Estrutura principal da SPA e declaração dos templates
├── index.js # Lógica central da aplicação (Event Listeners e Validação)
├── blocks/ # CSS modular separado por blocos (Metodologia BEM)
│ ├── card.css # Estilos dos cartões individuais
│ ├── cards.css # Grade/Grid dos cartões
│ ├── content.css # Conteúdo central da página
│ ├── footer.css # Rodapé
│ ├── header.css # Cabeçalho e Logotipo
│ ├── page.css # Configurações globais da página e plano de fundo
│ ├── popup.css # Estilos dos Modais, Estados de Erro e Inputs
│ └── profile.css # Seção de informações do usuário
└── pages/
└── index.css # Arquivo agregador que importa as folhas de estilo individuais

---

### ⚠️ Regras de Validação Implementadas

FormulárioCampoTipo / RegraComportamento em caso de ErroEditar PerfilNomeRequired, Min 2 / Max 40 caract.Texto explicativo vermelho + borda inferior vermelha.Editar PerfilSobre mimRequired, Min 2 / Max 200 caract.Desativa o botão "Salvar".Novo LocalTítuloRequired, Min 2 / Max 30 caract.Texto explicativo vermelho + borda inferior vermelha.Novo LocalLink de ImagemRequired, Formato de URLDesativa o botão "Criar".
