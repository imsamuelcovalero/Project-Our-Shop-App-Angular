# Bem-vindo ao Project-Our-Shop-App-Angular

O __Project-Our-Shop-App-Angular__ é uma aplicação de comércio eletrônico desenvolvida com `MongoDB` no banco de dados, `Angular.js` no `frontend` e `Node.js` com `Mongoose`no `backend`. Ela permite que usuários visualizem produtos, adicionem itens ao carrinho de compras, realizem o checkout escolhendo o ponto de retirada e vejam o histórico de pedidos.

## Sumário

- [Bem-vindo ao Project-Our-Shop-App-Angular](#bem-vindo-ao-project-our-shop-app-angular)
  - [Sumário](#sumário)
  - [Visualização](#visualização)
  - [Contexto](#contexto)
    - [Visão Geral de Funcionalidades](#visão-geral-de-funcionalidades)
  - [Como rodar a aplicação e detalhes do funcionamento](#como-rodar-a-aplicação-e-detalhes-do-funcionamento)
    - [Início Rápido](#início-rápido)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Notas](#notas)
    - [Git, GitHub e Histórico de Commits](#git-github-e-histórico-de-commits)

## Visualização

<!-- **Visualização:** -->

__Em construção__
<!-- Quando estiver pronto, substitua pela URL da imagem/GIF aqui -->

<div align="center">

<!-- Adicione a URL da imagem aqui -->

![Project-Our-Shop-App-Angular](https://github.com/imsamuelcovalero/Project-Our-Shop-App-Angular/assets/98184355/6651864d-1d2e-459f-ac2f-6ce4cb667097)

</div>

## Contexto

O __Project-Our-Shop-App-Angular__ é uma solução desenvolvida para proporcionar uma experiência de varejo online, com opção de escolha de ponto de retirada dos itens adquiridos. Com ela, os usuários podem navegar por um catálogo de produtos, adicioná-los ao carrinho de compras e realizar o checkout, aonde é possível utilizar o bônus do cashback para abater no valor final da compra. Além disso, os usuários podem ver o histórico de pedidos com o valor atual de saldo cashback.

### Visão Geral de Funcionalidades

O __Project-Our-Shop-App-Angular__ conta com uma interface amigável e intuitiva, com opção de `temas` claro e escuro, que permite aos usuários:

- Fazer login ou se registrar
- Visualizar e escolher produtos que deseje comprar
- Ter a opção de utilizar o cashback para abater no valor total da compra
- Escolher um local de retirada

## Como rodar a aplicação e detalhes do funcionamento

### Início Rápido
<details>
<summary><strong>Detalhes</strong></summary>

**Com Docker**

1. Clone o repositório para sua máquina local.
2. Navegue até o diretório raiz do projeto no terminal: `cd Project-Our-Shop-App-Angular`.
3. No diretório raiz do projeto, execute `docker-compose up -d` para iniciar os containers.
4. O servidor de `backend` estará rodando na porta `3001` e a aplicação na porta `4200`.

**Sem Docker**

1. Clone o repositório para sua máquina local.
2. Navegue até o diretório raiz do projeto no terminal: `cd Project-Our-Shop-App-Angular`.
3. Acesse o diretório `backend` e execute `npm install` para instalar as dependências.
4. Inicie o servidor com `npm run dev`.
5. A aplicação estará rodando na porta `3001`.
6. Acesse o diretório `frontend` e execute `npm install` para instalar as dependências.
7. Execute `ng serve` para iniciar a aplicação.
8. Abra um navegador web e acesse `http://localhost:4200`.
9. Você precisa estar com o `MongoDB` rodando localmente ou por um container do `docker` para que a aplicação funcione corretamente.

**Maiores detalhes sobre o funcionamento da aplicação podem ser encontrados no `README` do `frontend` e do `backend`.**

</details>

### Frontend

O `README` referente ao __Frontend__ pode ser acessado [aqui](frontend/README.md).

### Backend

O `README` referente ao __Backend__ pode ser acessado [aqui](backend/README.md).

## Notas

### Git, GitHub e Histórico de Commits

Este projeto utiliza a [Especificação de Commits Convencionais](https://www.conventionalcommits.org/en/v1.0.0/), com alguns tipos da [convenção Angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines). Além disso, foi utilizado o pacote [conventional-commit-cli](https://www.npmjs.com/package/conventional-commit-cli)

[⬆ Voltar ao topo](#sumário)
