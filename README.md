# Tripleten web_project_around_pt

# 📸 Around The U.S.

> Uma plataforma interativa e responsiva para entusiastas de viagens compartilharem momentos e explorarem paisagens icônicas.

---

## 📖 Sobre o Projeto

O **Around The U.S.** é uma aplicação front-end desenvolvida para proporcionar uma experiência de galeria interativa. O foco do projeto foi aplicar conceitos avançados de **DOM Manipulation**, validação de formulários e design responsivo, garantindo que a interface seja fluida tanto em desktops quanto em dispositivos móveis.

---

## ✨ Funcionalidades

- **Edição de Perfil**: Atualização dinâmica de nome e profissão via popup.
- **Gestão de Conteúdo**: Adição de novos locais com título e URL de imagem.
- **Interatividade**: Sistema de "curtir" (like) e exclusão de cards.
- **Visualização Ampliada**: Visualização de imagens em tela cheia através de modais específicos.
- **Design Responsivo**: Layout adaptável para resoluções de 320px a 1280px+.

---

## 🛠️ Tecnologias Utilizadas

| **Tecnologia**        | **Finalidade**                                              |
| --------------------- | ----------------------------------------------------------- |
| **HTML5**             | Estruturação semântica do conteúdo.                         |
| **CSS3**              | Estilização avançada, Grid Layout, Flexbox e Media Queries. |
| **JavaScript (ES6+)** | Lógica de negócios, manipulação do DOM e eventos.           |
| **BEM Methodology**   | Organização de classes CSS para escalabilidade.             |

---

## 🏗️ Arquitetura e Estrutura

O projeto segue uma estrutura modular de arquivos CSS, facilitando a manutenção:

Plaintext

`├── images/             # Ativos visuais (ícones e logos)
├── pages/
│   └── index.css       # Arquivo principal que importa os módulos
├── scripts/
│   └── index.js        # Lógica principal e manipulação de eventos
├── blocks/             # Módulos CSS baseados em BEM
│   ├── card.css        # Estilos dos cartões de imagem
│   ├── popup.css       # Estilos dos modais e formulários
│   ├── profile.css     # Seção de informações do usuário
│   └── ...
└── index.html          # Estrutura principal da página`

---

## 🚀 Instalação e Uso

Para rodar este projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**Bash

   `git clone https://github.com/seu-usuario/around-the-us.git`

2. **Navegue até o diretório:**Bash

   `cd around-the-us`

3. **Abra o projeto:**

   Como o projeto utiliza Vanilla JavaScript e CSS puro, basta abrir o arquivo `index.html` em seu navegador de preferência ou utilizar a extensão **Live Server** no VS Code.

---

## 🤝 Contribuição

Contribuições são o que tornam a comunidade open source um lugar incrível para aprender e criar.

1. Faça um **Fork** do projeto.
2. Crie uma **Branch** para sua feature (`git checkout -b feature/IncrívelFeature`).
3. Dê um **Commit** em suas alterações (`git commit -m 'Add: Alguma Feature'`).
4. Faça um **Push** para a Branch (`git push origin feature/IncrívelFeature`).
5. Abra um **Pull Request**.
