# Tripleten web_project_around_pt

# 📸 Around The U.S.

> Uma plataforma interativa e responsiva para entusiastas de viagens compartilharem momentos e explorarem paisagens icônicas.

---

## 📌 Índice

1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Tech Stack](#%EF%B8%8F-tech-stack)
3. [Funcionalidades Principais](#-funcionalidades-principais)
4. [Arquitetura de Arquivos](#-arquitetura-de-arquivos)
5. [Arquitetura JavaScript: Classes e Módulos](#-arquitetura-javascript-classes-e-módulos)
6. [Regras de Validação Implementadas](#%EF%B8%8F-regras-de-valida%C3%A7%C3%A3o-implementadas)

---

## 📖 Sobre o Projeto

O **Around The U.S.** é uma aplicação web interativa baseada em um modelo do Figma. O projeto resolve o problema do compartilhamento rápido de imagens e gerenciamento de perfil do usuário de forma local e assíncrona na tela. Ele utiliza conceitos avançados de manipulação do DOM (Document Object Model), Programação Orientada a Objetos com classes ES6 e módulos JavaScript para proporcionar interatividade sem a necessidade de recarregar a página, mantendo o código organizado, reutilizável e de fácil manutenção.

---

## 🛠️ Tech Stack

| Camada          | Tecnologia                    | Propósito                                                                 |
| :-------------- | :---------------------------- | :------------------------------------------------------------------------ |
| **Estrutura**   | HTML5 Semântico               | Organização de modais, inputs e seções acessíveis.                        |
| **Estilização** | CSS3 (Metodologia BEM)        | Layout responsivo em Grid/Flexbox e modularização.                        |
| **Lógica**      | JavaScript Vanilla (ES6+)     | Classes, módulos (`import`/`export`) e validação nativa de formulários.   |
| **Organização** | Módulos ES6 (`type="module"`) | Separação de responsabilidades em arquivos independentes e reutilizáveis. |

---

## ✨ Funcionalidades Principais

- **Gerenciamento de Perfil:** Edição de Nome e Descrição com atualização dinâmica na tela.
- **Galeria Interativa:** Adição de novos cartões de viagem contendo título e link de imagem válido, gerados a partir da classe `Card`.
- **Validação em Tempo Real:** Inputs monitorados via a classe `FormValidator`, com bloqueio inteligente do botão de envio (`Submit`) e alteração visual da borda inferior em caso de erro.
- **Acessibilidade Avançada UX:** Fechamento de modais de forma intuitiva clicando fora do conteúdo (Overlay) ou pressionando a tecla `Esc`.
- **Interações Dinâmicas:** Sistema de curtidas com alteração visual de ícone e exclusão de cartões em tempo real.

---

## 📐 Arquitetura de Arquivos

| Arquivo / Diretório        | Tipo / Contexto       | Descrição e Responsabilidade Técnica                                                                                                                                       |
| :------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`               | Estrutura Principal   | Arquivo raiz contendo a SPA, marcação dos modais de pop-up e as estruturas de template para renderização dos cartões.                                                      |
| `scripts/index.js`         | Lógica Central        | Ponto de entrada da aplicação. Importa as classes e funções dos demais módulos, captura elementos do DOM, instancia `Card` e `FormValidator` e conecta os eventos globais. |
| `scripts/Card.js`          | Classe / Componente   | Define a classe `Card`, responsável por gerar a marcação de cada cartão a partir do template e controlar seus próprios eventos (curtir, excluir, abrir imagem).            |
| `scripts/FormValidator.js` | Classe / Validação    | Define a classe `FormValidator`, responsável por validar os campos de um formulário e controlar o estado do botão de envio.                                                |
| `scripts/utils.js`         | Funções Utilitárias   | Reúne as funções compartilhadas de abertura/fechamento de modais (`openModal`, `closeModal`) e o fechamento via clique no overlay.                                         |
| `blocks/card.css`          | Componente UI         | Estilização individual de cada cartão de imagem, incluindo o posicionamento das imagens e botões internos.                                                                 |
| `blocks/cards.css`         | Componente Layout     | Gerenciamento da grade de exibição utilizando CSS Grid com comportamento responsivo (auto-fit).                                                                            |
| `blocks/content.css`       | Componente Estrutural | Definição das propriedades de crescimento flexível do contêiner principal da aplicação.                                                                                    |
| `blocks/footer.css`        | Componente UI         | Estilização do rodapé da aplicação corporativa, assegurando a tipografia e espaçamentos corretos.                                                                          |
| `blocks/header.css`        | Componente UI         | Alinhamento do logotipo superior e controle de altura flexível para dispositivos móveis.                                                                                   |
| `blocks/page.css`          | Escopo Global         | Configurações globais do plano de fundo e centralização da seção baseada na largura máxima recomendada.                                                                    |
| `blocks/popup.css`         | Componente Feedback   | Estilos de modais sobrepostos, animações de abertura, estados ativos de erro e estilização de botões desabilitados.                                                        |
| `blocks/profile.css`       | Componente UI         | Organização em grid das informações do usuário explorador, foto de perfil arredondada e botões de gatilho.                                                                 |
| `pages/index.css`          | Arquivo Agregador     | Ponto de entrada CSS que consolida as importações de todos os arquivos do diretório blocks para otimização.                                                                |

---

## 🧩 Arquitetura JavaScript: Classes e Módulos

A lógica de JavaScript foi dividida em **módulos ES6** (`import`/`export`), carregados no `index.html` através de `<script src="scripts/index.js" type="module"></script>`. Essa separação isola responsabilidades, evita poluição do escopo global e facilita testes e manutenção futura.

### Classe `Card`

Responsável por criar um cartão completo (imagem + título) a partir dos dados recebidos e do template HTML.

- **Construtor:** recebe os dados do cartão (`name`, `link`), o seletor do elemento `<template>` e uma função de callback para abrir o pop-up de imagem.
- **Métodos privados** (convenção `_nomeDoMetodo`):
  - `_getTemplate()` — clona a marcação do template no DOM.
  - `_fillCardData()` — preenche a imagem, o `alt` e o título com os dados recebidos.
  - `_setEventListeners()` — adiciona os ouvintes de evento aos botões e à imagem do cartão.
  - `_handleLikeIcon()`, `_handleDeleteCard()`, `_handleImageClick()` — um manipulador para cada interação do cartão.
- **Método público:** `generateCard()` — monta o cartão por completo e devolve o elemento pronto para ser inserido na página.

### Classe `FormValidator`

Responsável por validar um formulário e controlar visualmente o estado do botão de envio.

- **Construtor:** recebe um objeto de configuração (seletores de input/botão e classes CSS de erro/estado inativo) e o elemento do formulário a ser validado.
- **Métodos privados:**
  - `_showInputError()` / `_hideInputError()` — exibem ou ocultam a mensagem de erro de um campo.
  - `_checkInputValidity()` — verifica a validade de um campo individual.
  - `_hasInvalidInput()` — verifica se existe algum campo inválido no formulário.
  - `_toggleButtonState()` — habilita ou desabilita o botão de envio conforme a validade geral do formulário.
  - `_setEventListeners()` — adiciona o ouvinte de `input` a cada campo do formulário.
- **Métodos públicos:**
  - `setEventListeners()` — habilita a validação do formulário.
  - `resetValidation()` — limpa erros visuais e reavalia o estado do botão (usado ao reabrir um pop-up).

### Módulo `utils.js`

Concentra as funções compartilhadas entre os formulários e cartões, evitando duplicação de código:

- `openModal(popup)` / `closeModal(popup)` — controlam a exibição dos pop-ups e o ouvinte da tecla `Esc`.
- `handleOverlayClose(evt)` — fecha o pop-up quando o clique ocorre fora da área de conteúdo.

### Módulo `index.js`

Atua como orquestrador da aplicação: importa as classes e funções dos demais módulos, mapeia os elementos do DOM, cria as instâncias de `Card` (uma para cada item de `initialCards` e para cada novo cartão criado pelo usuário) e de `FormValidator` (uma para o formulário de perfil e outra para o formulário de novo cartão), além de conectar os eventos de abertura/fechamento dos pop-ups.

---

### ⚠️ Regras de Validação Implementadas

| Formulário        | Campo          | Tipo / Regra                        | Comportamento em caso de Erro                         |
| :---------------- | :------------- | :---------------------------------- | :---------------------------------------------------- |
| **Editar Perfil** | Nome           | `Required`, Min 2 / Max 40 caract.  | Texto explicativo vermelho + borda inferior vermelha. |
| **Editar Perfil** | Sobre mim      | `Required`, Min 2 / Max 200 caract. | Desativa o botão "Salvar".                            |
| **Novo Local**    | Título         | `Required`, Min 2 / Max 30 caract.  | Texto explicativo vermelho + borda inferior vermelha. |
| **Novo Local**    | Link de Imagem | `Required`, Formato de `URL`        | Desativa o botão "Criar".                             |
