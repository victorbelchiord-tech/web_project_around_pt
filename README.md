# Tripleten web_project_around_pt

# 📸 Around The U.S.

> Uma plataforma interativa e responsiva para entusiastas de viagens compartilharem momentos e explorarem paisagens icônicas, agora integrada a um servidor real via REST API.

---

## 📌 Índice

1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Tech Stack](#%EF%B8%8F-tech-stack)
3. [Funcionalidades Principais](#-funcionalidades-principais)
4. [Arquitetura de Arquivos](#-arquitetura-de-arquivos)
5. [Arquitetura JavaScript: Classes e Módulos](#-arquitetura-javascript-classes-e-módulos)
6. [Integração com a API](#-integração-com-a-api)
7. [Regras de Validação Implementadas](#%EF%B8%8F-regras-de-valida%C3%A7%C3%A3o-implementadas)

---

## 📖 Sobre o Projeto

O **Around The U.S.** é uma aplicação web interativa baseada em um modelo do Figma. O projeto resolve o problema do compartilhamento rápido de imagens e gerenciamento de perfil do usuário de forma dinâmica na tela. Ele utiliza conceitos avançados de manipulação do DOM (Document Object Model), Programação Orientada a Objetos com classes ES6, módulos JavaScript e requisições assíncronas a um servidor REST para proporcionar uma experiência completa, sem a necessidade de recarregar a página, mantendo o código organizado, reutilizável e de fácil manutenção.

Nesta etapa do projeto, a aplicação deixou de usar dados estáticos e passou a se comunicar com o servidor em todas as suas funcionalidades: carregamento de perfil e cartões, edição de perfil, upload de avatar, criação e exclusão de cartões e sistema de curtidas. Toda a comunicação com o back-end foi encapsulada em uma classe `Api` dedicada, seguindo os mesmos princípios de orientação a objetos já usados no restante do projeto: herança, encapsulamento e separação de responsabilidades.

---

## 🛠️ Tech Stack

| Camada          | Tecnologia                    | Propósito                                                                      |
| :-------------- | :---------------------------- | :----------------------------------------------------------------------------- |
| **Estrutura**   | HTML5 Semântico               | Organização de modais, inputs e seções acessíveis.                             |
| **Estilização** | CSS3 (Metodologia BEM)        | Layout responsivo em Grid/Flexbox e modularização.                             |
| **Lógica**      | JavaScript Vanilla (ES6+)     | Classes, módulos (`import`/`export`) e validação nativa de formulários.        |
| **Comunicação** | Fetch API / REST              | Requisições assíncronas (`GET`, `PATCH`, `POST`, `PUT`, `DELETE`) ao servidor. |
| **Organização** | Módulos ES6 (`type="module"`) | Separação de responsabilidades em arquivos independentes e reutilizáveis.      |

---

## ✨ Funcionalidades Principais

- **Perfil Conectado ao Servidor:** Nome, descrição e avatar são carregados do servidor ao abrir a página e atualizados via `PATCH` sempre que editados, através da classe `UserInfo` em conjunto com `Api`.
- **Galeria Dinâmica:** Cartões iniciais são buscados do servidor (`GET /cards`) e renderizados via a classe `Section`, que gerencia a inserção dos elementos na página.
- **Pop-ups Orientados a Objetos:** Toda a lógica de abertura, fechamento (botão, tecla Esc e overlay) e reset de formulários está encapsulada nas classes `Popup`, `PopupWithImage`, `PopupWithForm` e `PopupWithConfirmation`.
- **Validação em Tempo Real:** Inputs monitorados via a classe `FormValidator`, com bloqueio inteligente do botão de envio e alteração visual da borda inferior em caso de erro.
- **Atualização de Avatar:** Ao passar o mouse sobre a foto de perfil, um ícone de edição aparece; um clique abre um pop-up para atualizar o avatar via link de imagem (`PATCH /users/me/avatar`).
- **Curtidas Sincronizadas:** Sistema de curtidas que envia `PUT`/`DELETE` para `/cards/:cardId/likes` e só atualiza o ícone após a confirmação do servidor.
- **Exclusão Segura de Cartões:** Um pop-up de confirmação (`PopupWithConfirmation`) pergunta "Tem certeza?" antes de enviar a requisição `DELETE`. O botão de excluir só é exibido em cartões pertencentes ao usuário logado.
- **Feedback de Carregamento:** Os botões de "Salvar", "Crie" e confirmação de exclusão exibem textos como "Salvando...", "Criando..." e "Excluindo..." enquanto aguardam a resposta do servidor.
- **Acessibilidade Avançada UX:** Fechamento de modais de forma intuitiva clicando fora do conteúdo (Overlay) ou pressionando a tecla `Esc`.

---

## 📐 Arquitetura de Arquivos

| Arquivo / Diretório                    | Tipo / Contexto            | Descrição e Responsabilidade Técnica                                                                                                                                                                                  |
| :------------------------------------- | :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/index.html`                       | Estrutura Principal        | Arquivo raiz contendo a SPA, marcação dos modais de pop-up (perfil, novo local, avatar, confirmação e imagem) e as estruturas de template para renderização dos cartões.                                              |
| `src/scripts/index.js`                 | Lógica Central             | Ponto de entrada da aplicação. Importa todas as classes, instancia os objetos, carrega os dados iniciais do servidor via `Promise.all` e conecta os ouvintes de eventos das interações do usuário.                    |
| `src/scripts/Api.js`                   | Classe / Comunicação       | Define a classe `Api`, responsável por todas as requisições ao servidor (usuário, cartões, curtidas, avatar e exclusão), validando as respostas com `res.ok`.                                                         |
| `src/scripts/Card.js`                  | Classe / Componente        | Define a classe `Card`. Recebe os dados do servidor (`_id`, `owner`, `isLiked`), o `handleCardClick`, `handleLikeClick` e `handleDeleteClick`, e expõe `getId()`, `isLiked()`, `updateLikeStatus()` e `removeCard()`. |
| `src/scripts/FormValidator.js`         | Classe / Validação         | Define a classe `FormValidator`, responsável por validar os campos de um formulário e controlar o estado do botão de envio.                                                                                           |
| `src/scripts/Popup.js`                 | Classe / Modal Base        | Classe base que encapsula a lógica de abertura/fechamento de pop-ups, incluindo o fechamento por tecla Esc e clique no overlay.                                                                                       |
| `src/scripts/PopupWithImage.js`        | Classe / Modal Imagem      | Classe filha de `Popup`. Sobrescreve o método `open()` para preencher a imagem e a legenda antes de exibir o pop-up.                                                                                                  |
| `src/scripts/PopupWithForm.js`         | Classe / Modal Form        | Classe filha de `Popup`. Adiciona lógica de submit ao formulário via callback, coleta os valores dos inputs com `_getInputValues()`, reseta o formulário ao fechar e expõe `renderLoading()` para feedback visual.    |
| `src/scripts/PopupWithConfirmation.js` | Classe / Modal Confirmação | Classe filha de `Popup`. Exibe o pop-up "Tem certeza?" antes de excluir um cartão, com `setSubmitAction()` para definir a ação e `renderLoading()` para o estado "Excluindo...".                                      |
| `src/scripts/UserInfo.js`              | Classe / Perfil            | Gerencia a leitura (`getUserInfo`) e a escrita (`setUserInfo`) do nome e da descrição, além do avatar (`setUserAvatar`) e do ID do usuário logado (`setUserId`/`getUserId`).                                          |
| `src/scripts/Section.js`               | Classe / Renderização      | Responsável por renderizar uma lista de itens em um contêiner do DOM. Recebe os dados e a função de renderização via construtor, e expõe `addItem()` para inserção de elementos individualmente.                      |
| `src/blocks/card.css`                  | Componente UI              | Estilização individual de cada cartão de imagem.                                                                                                                                                                      |
| `src/blocks/cards.css`                 | Componente Layout          | Gerenciamento da grade de exibição utilizando CSS Grid com comportamento responsivo (auto-fit).                                                                                                                       |
| `src/blocks/content.css`               | Componente Estrutural      | Definição das propriedades de crescimento flexível do contêiner principal da aplicação.                                                                                                                               |
| `src/blocks/footer.css`                | Componente UI              | Estilização do rodapé da aplicação.                                                                                                                                                                                   |
| `src/blocks/header.css`                | Componente UI              | Alinhamento do logotipo superior e controle de altura flexível para dispositivos móveis.                                                                                                                              |
| `src/blocks/page.css`                  | Escopo Global              | Configurações globais do plano de fundo e centralização da seção baseada na largura máxima recomendada.                                                                                                               |
| `src/blocks/popup.css`                 | Componente Feedback        | Estilos de modais sobrepostos, estados ativos de erro, botões desabilitados e o modal compacto de confirmação de exclusão.                                                                                            |
| `src/blocks/profile.css`               | Componente UI              | Organização em grid das informações do usuário, foto de perfil (com overlay de edição de avatar) e botões de gatilho.                                                                                                 |
| `src/pages/index.css`                  | Arquivo Agregador          | Ponto de entrada CSS que consolida as importações do `vendor` e de todos os arquivos do diretório `blocks`.                                                                                                           |
| `src/vendor/normalize.css`             | Reset CSS                  | Normalização de estilos padrão entre navegadores.                                                                                                                                                                     |
| `src/vendor/fonts.css`                 | Tipografia                 | Declarações `@font-face` da família Inter (Regular, Medium e Black).                                                                                                                                                  |
| `src/images/`                          | Ativos Visuais             | Ícones (curtir, excluir, adicionar, editar, editar avatar, fechar), logotipo e imagens de avatar/placeholder.                                                                                                         |

---

## 🧩 Arquitetura JavaScript: Classes e Módulos

A lógica de JavaScript foi dividida em **módulos ES6** (`import`/`export`), carregados no `index.html` através de `<script src="scripts/index.js" type="module"></script>`.

### Classe `Api`

Responsável por toda a comunicação com o servidor do projeto.

- **Construtor:** recebe um objeto `{ baseUrl, headers }` com a URL base da API e os cabeçalhos de autorização.
- **Métodos privados:**
  - `_checkResponse(res)` — verifica `res.ok` e retorna o JSON da resposta ou rejeita a Promise com o status do erro.
- **Métodos públicos:**
  - `getUserInfo()` — busca os dados do usuário logado (`GET /users/me`).
  - `getInitialCards()` — busca a lista de cartões (`GET /cards`).
  - `getAppInfo()` — retorna `Promise.all([getUserInfo(), getInitialCards()])`, usado para carregar perfil e cartões em paralelo.
  - `updateUserInfo({ name, about })` — atualiza nome e descrição do perfil (`PATCH /users/me`).
  - `updateAvatar(avatar)` — atualiza a foto de perfil (`PATCH /users/me/avatar`).
  - `addCard({ name, link })` — cria um novo cartão (`POST /cards`).
  - `deleteCard(cardId)` — exclui um cartão (`DELETE /cards/:cardId`).
  - `changeLikeCardStatus(cardId, isLiked)` — curte ou descurte um cartão (`PUT`/`DELETE /cards/:cardId/likes`).

### Classe `Popup`

Classe base responsável por toda a lógica de abertura e fechamento de pop-ups.

- **Construtor:** recebe o seletor CSS do pop-up.
- **Métodos privados:**
  - `_handleEscClose(evt)` — fecha o pop-up ao pressionar a tecla `Esc`.
- **Métodos públicos:**
  - `open()` — adiciona a classe `popup_is-opened` e registra o listener da tecla Esc.
  - `close()` — remove a classe `popup_is-opened` e desregistra o listener da tecla Esc.
  - `setEventListeners()` — adiciona o listener ao botão de fechar (`.popup__close`) e ao clique no overlay.

### Classe `PopupWithImage` _(filha de Popup)_

Especialização da classe `Popup` para o pop-up de visualização de imagem.

- **Construtor:** herda o seletor do pop-up de `Popup` e captura os elementos `.popup__image` e `.popup__caption`.
- **Método público:**
  - `open(name, link)` — preenche a imagem (`src`, `alt`) e a legenda antes de chamar `super.open()`.

### Classe `PopupWithForm` _(filha de Popup)_

Especialização da classe `Popup` para pop-ups que contêm formulários (editar perfil, novo local e atualizar avatar).

- **Construtor:** recebe o seletor do pop-up e uma função de callback `handleFormSubmit`.
- **Métodos privados:**
  - `_getInputValues()` — percorre os inputs do formulário e retorna um objeto `{ name: value }` para cada campo.
- **Métodos públicos:**
  - `renderLoading(isLoading, loadingText)` — altera o texto do botão de envio (ex.: "Salvando...", "Criando...") enquanto a requisição está em andamento.
  - `close()` — chama `super.close()` e também reseta o formulário (`form.reset()`).
  - `setEventListeners()` — chama `super.setEventListeners()` e adiciona o listener de `submit` ao formulário, chamando o callback com os valores dos inputs.

### Classe `PopupWithConfirmation` _(filha de Popup)_

Especialização da classe `Popup` para o pop-up de confirmação de exclusão de cartão.

- **Construtor:** herda o seletor do pop-up de `Popup` e guarda o texto padrão do botão de confirmação.
- **Métodos públicos:**
  - `setSubmitAction(callback)` — define qual ação será executada ao clicar em "Sim" (permite reutilizar o mesmo pop-up para qualquer cartão).
  - `renderLoading(isLoading)` — altera o texto do botão para "Excluindo..." durante a requisição.
  - `setEventListeners()` — chama `super.setEventListeners()` e adiciona o listener de clique no botão de confirmação.

### Classe `UserInfo`

Responsável por gerenciar as informações do perfil do usuário na página.

- **Construtor:** recebe um objeto `{ nameSelector, descriptionSelector, avatarSelector }` com os seletores dos elementos de nome, descrição e avatar.
- **Métodos públicos:**
  - `getUserInfo()` — retorna um objeto `{ name, description, avatar }` com os valores atuais do perfil.
  - `setUserInfo({ name, about })` — atualiza nome e descrição do perfil na página.
  - `setUserAvatar(avatar)` — atualiza a foto de perfil na página.
  - `setUserId(id)` / `getUserId()` — armazena e retorna o `_id` do usuário logado, usado para saber quais cartões podem ser excluídos.

### Classe `Section`

Responsável por renderizar uma lista de elementos em um contêiner do DOM.

- **Construtor:** recebe um objeto `{ items, renderer }` e o seletor do contêiner. `items` é o array de dados iniciais (vindo do servidor); `renderer` é a função de callback que cria e insere cada elemento.
- **Métodos públicos:**
  - `renderItems()` — itera sobre `items` chamando `renderer` para cada um.
  - `addItem(element)` — insere um elemento DOM no início do contêiner com `prepend`.

### Classe `Card`

Responsável por criar um cartão completo a partir dos dados recebidos do servidor e do template HTML.

- **Construtor:** recebe os dados do cartão (`name`, `link`, `_id`, `owner`, `isLiked`), o seletor do `<template>`, um objeto `{ handleCardClick, handleLikeClick, handleDeleteClick }` e o ID do usuário logado.
- **Métodos públicos:**
  - `getId()` — retorna o `_id` do cartão.
  - `isLiked()` — retorna o estado atual da curtida.
  - `updateLikeStatus(isLiked)` — atualiza o ícone de curtida após a confirmação do servidor.
  - `removeCard()` — remove o cartão do DOM após a confirmação de exclusão do servidor.
  - `generateCard()` — monta o cartão, aplica o estado de curtida, esconde o botão de excluir se o cartão não pertencer ao usuário logado, e devolve o elemento pronto para ser inserido na página.

### Classe `FormValidator`

Responsável por validar um formulário e controlar visualmente o estado do botão de envio. Sem alterações nesta etapa.

### Módulo `index.js`

Atua como orquestrador da aplicação: instancia a `Api` e todas as classes, carrega perfil e cartões do servidor via `Promise.all`, e conecta os ouvintes de eventos responsáveis por editar o perfil, adicionar/curtir/excluir cartões e atualizar o avatar — sempre delegando a comunicação com o servidor à classe `Api` e o feedback visual de carregamento às classes de pop-up.

---

## 🌐 Integração com a API

| Ação                            | Método   | Endpoint               |
| :------------------------------ | :------- | :--------------------- |
| Buscar dados do usuário         | `GET`    | `/users/me`            |
| Buscar cartões iniciais         | `GET`    | `/cards`               |
| Editar nome/descrição do perfil | `PATCH`  | `/users/me`            |
| Atualizar avatar                | `PATCH`  | `/users/me/avatar`     |
| Criar novo cartão               | `POST`   | `/cards`               |
| Excluir cartão                  | `DELETE` | `/cards/:cardId`       |
| Curtir cartão                   | `PUT`    | `/cards/:cardId/likes` |
| Descurtir cartão                | `DELETE` | `/cards/:cardId/likes` |

Todas as requisições enviam o cabeçalho `authorization` com o token do projeto, e as de escrita (`PATCH`/`POST`) também enviam `Content-Type: application/json`. Erros de rede ou de resposta são tratados nos blocos `.catch()` de cada chamada em `index.js`, registrando a mensagem no console.

---

### ⚠️ Regras de Validação Implementadas

| Formulário           | Campo          | Tipo / Regra                        | Comportamento em caso de Erro                         |
| :------------------- | :------------- | :---------------------------------- | :---------------------------------------------------- |
| **Editar Perfil**    | Nome           | `Required`, Min 2 / Max 40 caract.  | Texto explicativo vermelho + borda inferior vermelha. |
| **Editar Perfil**    | Sobre mim      | `Required`, Min 2 / Max 200 caract. | Desativa o botão "Salvar".                            |
| **Novo Local**       | Título         | `Required`, Min 2 / Max 30 caract.  | Texto explicativo vermelho + borda inferior vermelha. |
| **Novo Local**       | Link de Imagem | `Required`, Formato de `URL`        | Desativa o botão "Crie".                              |
| **Atualizar Avatar** | Link de Imagem | `Required`, Formato de `URL`        | Desativa o botão "Salvar".                            |
