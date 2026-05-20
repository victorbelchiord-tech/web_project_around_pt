# Tripleten web_project_around_pt

# 📸 Around The U.S.

> Uma plataforma interativa e responsiva para entusiastas de viagens compartilharem momentos e explorarem paisagens icônicas.

---

_(Substitua este espaço por um GIF ou Screenshot do seu projeto rodando)_

---

## 📌 Índice

1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Tech Stack](#%EF%B8%8F-tech-stack)
3. [Funcionalidades Principais](#-funcionalidades-principais)
4. [Instalação e Uso](#-instala%C3%A7%C3%A3o-e-uso)
5. [Arquitetura de Arquivos](#-arquitetura-de-arquivos)
6. [Regras de Validação Implementadas](#%EF%B8%8F-regras-de-valida%C3%A7%C3%A3o-implementadas)
7. [Contribuição](#-contribui%C3%A7%C3%A3o)
8. [Licença e Contato](#-licen%C3%A7a-e-contato)

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
