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

| Arquivo / Diretório  | Tipo / Contexto       | Descrição e Responsabilidade Técnica                                                                                                   |
| :------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `index.html`         | Estrutura Principal   | Arquivo raiz contendo a SPA, marcação dos modais de pop-up e as estruturas de template para renderização dos cartões.                  |
| `index.js`           | Lógica Central        | Script principal responsável pela captura do DOM, gerenciamento de estados, listeners globais (Esc/clique fora) e funções de callback. |
| `blocks/card.css`    | Componente UI         | Estilização individual de cada cartão de imagem, incluindo o posicionamento das imagens e botões internos.                             |
| `blocks/cards.css`   | Componente Layout     | Gerenciamento da grade de exibição utilizando CSS Grid com comportamento responsivo (auto-fit).                                        |
| `blocks/content.css` | Componente Estrutural | Definição das propriedades de crescimento flexível do contêiner principal da aplicação.                                                |
| `blocks/footer.css`  | Componente UI         | Estilização do rodapé da aplicação corporativa, assegurando a tipografia e espaçamentos corretos.                                      |
| `blocks/header.css`  | Componente UI         | Alinhamento do logotipo superior e controle de altura flexível para dispositivos móveis.                                               |
| `blocks/page.css`    | Escopo Global         | Configurações globais do plano de fundo e centralização da seção baseada na largura máxima recomendada.                                |
| `blocks/popup.css`   | Componente Feedback   | Estilos de modais sobrepostos, animações de abertura, estados ativos de erro e estilização de botões desabilitados.                    |
| `blocks/profile.css` | Componente UI         | Organização em grid das informações do usuário explorador, foto de perfil arredondada e botões de gatilho.                             |
| `pages/index.css`    | Arquivo Agregador     | Ponto de entrada CSS que consolida as importações de todos os arquivos do diretório blocks para otimização.                            |

---

### ⚠️ Regras de Validação Implementadas

| Formulário        | Campo          | Tipo / Regra                        | Comportamento em caso de Erro                         |
| :---------------- | :------------- | :---------------------------------- | :---------------------------------------------------- |
| **Editar Perfil** | Nome           | `Required`, Min 2 / Max 40 caract.  | Texto explicativo vermelho + borda inferior vermelha. |
| **Editar Perfil** | Sobre mim      | `Required`, Min 2 / Max 200 caract. | Desativa o botão "Salvar".                            |
| **Novo Local**    | Título         | `Required`, Min 2 / Max 30 caract.  | Texto explicativo vermelho + borda inferior vermelha. |
| **Novo Local**    | Link de Imagem | `Required`, Formato de `URL`        | Desativa o botão "Criar".                             |
