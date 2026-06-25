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

Nesta etapa do projeto, toda a lógica anteriormente distribuída em funções utilitárias e manipulações diretas do DOM foi encapsulada em **classes com responsabilidades bem definidas**, seguindo os princípios de orientação a objetos: herança, encapsulamento e separação de responsabilidades.

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

- **Gerenciamento de Perfil:** Edição de Nome e Descrição com atualização dinâmica na tela via a classe `UserInfo`.
- **Galeria Interativa:** Adição de novos cartões de viagem via a classe `Section`, que gerencia a renderização e inserção dos elementos na página.
- **Pop-ups Orientados a Objetos:** Toda a lógica de abertura, fechamento (botão, tecla Esc e overlay) e reset de formulários está encapsulada nas classes `Popup`, `PopupWithImage` e `PopupWithForm`.
- **Validação em Tempo Real:** Inputs monitorados via a classe `FormValidator`, com bloqueio inteligente do botão de envio e alteração visual da borda inferior em caso de erro.
- **Acessibilidade Avançada UX:** Fechamento de modais de forma intuitiva clicando fora do conteúdo (Overlay) ou pressionando a tecla `Esc`.
- **Interações Dinâmicas:** Sistema de curtidas com alteração visual de ícone e exclusão de cartões em tempo real.

---

## 📐 Arquitetura de Arquivos

| Arquivo / Diretório         | Tipo / Contexto       | Descrição e Responsabilidade Técnica                                                                                                                                                             |
| :-------------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`                | Estrutura Principal   | Arquivo raiz contendo a SPA, marcação dos modais de pop-up e as estruturas de template para renderização dos cartões.                                                                            |
| `scripts/index.js`          | Lógica Central        | Ponto de entrada da aplicação. Importa todas as classes, instancia os objetos e adiciona apenas os ouvintes de eventos específicos de cada interação do usuário.                                 |
| `scripts/Card.js`           | Classe / Componente   | Define a classe `Card`. Recebe `handleCardClick` no construtor para abrir o pop-up de imagem ao clicar no cartão.                                                                                |
| `scripts/FormValidator.js`  | Classe / Validação    | Define a classe `FormValidator`, responsável por validar os campos de um formulário e controlar o estado do botão de envio.                                                                      |
| `scripts/Popup.js`          | Classe / Modal Base   | Classe base que encapsula a lógica de abertura/fechamento de pop-ups, incluindo o fechamento por tecla Esc e clique no overlay.                                                                  |
| `scripts/PopupWithImage.js` | Classe / Modal Imagem | Classe filha de `Popup`. Sobrescreve o método `open()` para preencher a imagem e a legenda antes de exibir o pop-up.                                                                             |
| `scripts/PopupWithForm.js`  | Classe / Modal Form   | Classe filha de `Popup`. Adiciona lógica de submit ao formulário via callback, coleta os valores dos inputs com `_getInputValues()` e reseta o formulário ao fechar.                             |
| `scripts/UserInfo.js`       | Classe / Perfil       | Gerencia a leitura (`getUserInfo`) e a escrita (`setUserInfo`) das informações de nome e descrição do perfil do usuário na página.                                                               |
| `scripts/Section.js`        | Classe / Renderização | Responsável por renderizar uma lista de itens em um contêiner do DOM. Recebe os dados e a função de renderização via construtor, e expõe `addItem()` para inserção de elementos individualmente. |
| `blocks/card.css`           | Componente UI         | Estilização individual de cada cartão de imagem.                                                                                                                                                 |
| `blocks/cards.css`          | Componente Layout     | Gerenciamento da grade de exibição utilizando CSS Grid com comportamento responsivo (auto-fit).                                                                                                  |
| `blocks/content.css`        | Componente Estrutural | Definição das propriedades de crescimento flexível do contêiner principal da aplicação.                                                                                                          |
| `blocks/footer.css`         | Componente UI         | Estilização do rodapé da aplicação.                                                                                                                                                              |
| `blocks/header.css`         | Componente UI         | Alinhamento do logotipo superior e controle de altura flexível para dispositivos móveis.                                                                                                         |
| `blocks/page.css`           | Escopo Global         | Configurações globais do plano de fundo e centralização da seção baseada na largura máxima recomendada.                                                                                          |
| `blocks/popup.css`          | Componente Feedback   | Estilos de modais sobrepostos, estados ativos de erro e estilização de botões desabilitados.                                                                                                     |
| `blocks/profile.css`        | Componente UI         | Organização em grid das informações do usuário, foto de perfil e botões de gatilho.                                                                                                              |
| `pages/index.css`           | Arquivo Agregador     | Ponto de entrada CSS que consolida as importações de todos os arquivos do diretório blocks.                                                                                                      |

---

## 🧩 Arquitetura JavaScript: Classes e Módulos

A lógica de JavaScript foi dividida em **módulos ES6** (`import`/`export`), carregados no `index.html` através de `<script src="scripts/index.js" type="module"></script>`.

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

Especialização da classe `Popup` para pop-ups que contêm formulários.

- **Construtor:** recebe o seletor do pop-up e uma função de callback `handleFormSubmit`.
- **Métodos privados:**
  - `_getInputValues()` — percorre os inputs do formulário e retorna um objeto `{ name: value }` para cada campo.
- **Métodos públicos:**
  - `close()` — chama `super.close()` e também reseta o formulário (`form.reset()`).
  - `setEventListeners()` — chama `super.setEventListeners()` e adiciona o listener de `submit` ao formulário, chamando o callback com os valores dos inputs.

### Classe `UserInfo`

Responsável por gerenciar as informações do perfil do usuário na página.

- **Construtor:** recebe um objeto `{ nameSelector, descriptionSelector }` com os seletores dos elementos de nome e descrição.
- **Métodos públicos:**
  - `getUserInfo()` — retorna um objeto `{ name, description }` com os valores atuais do perfil.
  - `setUserInfo({ name, description })` — atualiza os elementos do perfil na página com os novos valores recebidos.

### Classe `Section`

Responsável por renderizar uma lista de elementos em um contêiner do DOM.

- **Construtor:** recebe um objeto `{ items, renderer }` e o seletor do contêiner. `items` é o array de dados iniciais; `renderer` é a função de callback que cria e insere cada elemento.
- **Métodos públicos:**
  - `renderItems()` — itera sobre `items` chamando `renderer` para cada um.
  - `addItem(element)` — insere um elemento DOM no início do contêiner com `prepend`.

### Classe `Card`

Responsável por criar um cartão completo a partir dos dados recebidos e do template HTML.

- **Construtor:** recebe os dados do cartão (`name`, `link`), o seletor do `<template>` e a função `handleCardClick` para abrir o pop-up de imagem.
- **Método público:** `generateCard()` — monta o cartão e devolve o elemento pronto para ser inserido na página.

### Classe `FormValidator`

Responsável por validar um formulário e controlar visualmente o estado do botão de envio. Sem alterações nesta etapa.

### Módulo `index.js`

Atua exclusivamente como orquestrador da aplicação: importa todas as classes, instancia os objetos (`userInfo`, `imagePopup`, `cardSection`, `editProfilePopup`, `newCardPopup`, `editFormValidator`, `addCardFormValidator`) e conecta apenas os ouvintes de eventos de abertura de pop-ups ao botão de editar perfil e ao botão de adicionar cartão. Toda lógica de comportamento está encapsulada nas classes.

---

### ⚠️ Regras de Validação Implementadas

| Formulário        | Campo          | Tipo / Regra                        | Comportamento em caso de Erro                         |
| :---------------- | :------------- | :---------------------------------- | :---------------------------------------------------- |
| **Editar Perfil** | Nome           | `Required`, Min 2 / Max 40 caract.  | Texto explicativo vermelho + borda inferior vermelha. |
| **Editar Perfil** | Sobre mim      | `Required`, Min 2 / Max 200 caract. | Desativa o botão "Salvar".                            |
| **Novo Local**    | Título         | `Required`, Min 2 / Max 30 caract.  | Texto explicativo vermelho + borda inferior vermelha. |
| **Novo Local**    | Link de Imagem | `Required`, Formato de `URL`        | Desativa o botão "Criar".                             |
