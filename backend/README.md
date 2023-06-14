## Sumário

- [Sumário](#sumário)
- [Contexto](#contexto)
- [Regras de Negócio](#regras-de-negócio)
- [Banco de Dados](#banco-de-dados)
  - [Diagrama](#diagrama)
- [API](#api)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
  - [Download do projeto](#download-do-projeto)
  - [Instalar dependências](#instalar-dependências)
  - [Executando com Docker](#executando-com-docker)
  - [Executando sem Docker](#executando-sem-docker)

## Contexto

Neste projeto, o __Backend__desempenha diversas funções fundamentais, tais como:

- Montar a estrutura inicial das tabelas e relações através do `Mongoose`.
- Possui alguns `scripts` no `package.json` para cuidar da organização e inicialização correta da aplicação, dando a opção de reiniciar o banco de dados ou manter os dados existentes.
- Receber do `Frontend` as entradas de dados e aplicar as validações e regras de negócio.
- Devolver para o `Frontend` as informações necessárias, a serem exibidas para o usuário.
- Ao receber uma nova ordem de compra, gravar as informações pertinentes no `banco de dados`, inclusive o valor atualizado do saldo de cashback do cliente.

## Regras de Negócio

Estamos utilizando principalmente o Joi para aplicar as regras de negócios e validações. O Joi é um validador de dados para JavaScript que utiliza um esquema para descrever a forma de dados que são permitidos e que serão validados. O Joi é extremamente poderoso e flexível, e pode ser utilizado para validar dados de forma simples e complexa.

<details>
<summary>Requisitos levantados</summary>

Em construção...

</details>

<details>
<summary>Verificações do backend</summary>

```plaintext
Em construção...
```

</details>

## Banco de Dados

O banco de dados foi criado utilizando o `MongoDB` e o `Mongoose` para gerenciar as tabelas e relações. O diagrama abaixo representa a estrutura do banco de dados:

### Diagrama

<div align="center">

Em construção...

<!-- **Em construção:** ![Diagrama do banco de dados](https://github.com/imsamuelcovalero/Desafio_Shopper/assets/98184355/cf010ceb-1cb3-4ed9-9d4b-02c9b83ebb13) -->  

</div>
  
## API

Em construção com o `Swagger`.

## Tecnologias e Ferramentas Utilizadas

Na construção do `Backend`, optei por utilizar uma variedade de tecnologias e ferramentas, selecionadas por suas vantagens específicas:

- [Node.js](https://nodejs.org/en): A plataforma de desenvolvimento em `JavaScript` foi escolhida para a construção do backend devido à sua alta performance, facilidade de aprendizado e ampla adoção na comunidade de desenvolvimento.
- [MongoDB](https://www.mongodb.com/): O MongoDB, um banco de dados não-relacional, foi utilizado devido à sua flexibilidade e escalabilidade, perfeitamente adequado para aplicativos modernos.
- [Mongoose](https://mongoosejs.com/): Uma biblioteca para MongoDB e Node.js que proporciona uma solução direta, baseada em esquemas, para modelar os dados da aplicação.
- [Joi](https://github.com/sideway/joi): Esta biblioteca de validação de dados em JavaScript foi escolhida por sua facilidade de uso e versatilidade na validação de diversos tipos de dados, incluindo o arquivo CSV importado.
- [Express](https://expressjs.com/): Este `framework web` para `Node.js` foi escolhido devido à sua simplicidade e eficácia na criação de rotas e endpoints do backend.
- [JWT](https://jwt.io/): JSON Web Tokens é um padrão (RFC 7519) que define uma forma compacta e autossuficiente para transmitir informações com segurança entre as partes como um objeto JSON.
- [@hapi/boom](https://github.com/hapijs/boom): Utilizei a biblioteca `Boom` para lidar com erros HTTP de forma mais fácil e organizada, permitindo uma melhor manipulação e apresentação dos erros para os usuários.

## Instalação e Execução

### Download do projeto

Primeiro, você precisa fazer o clone do repositório do projeto. Para isso, use o comando:

```bash
git clone git@github.com:imsamuelcovalero/Project-Our-Shop-App-Angular.git
```

### Instalar dependências

Em seguida, navegue até o diretório `backend` e instale as dependências necessárias com os seguintes comandos:

```bash
cd Project-Our-Shop-App-Angular

cd backend
npm install
```

Esses comandos instalam todas as dependências listadas no arquivo `package.json`, que são necessárias para a execução do projeto.

### Executando com Docker

Para executar o projeto utilizando `Docker`, assegure-se de ter o `Docker` e o `Docker Compose` instalados em sua máquina. Em seguida, no diretório raiz do projeto, execute o seguinte comando:

```bash
docker-compose up -d
```

**Importante:** Note que se já tiver executado este comando no `frontend`, não será necessário executá-lo novamente, pois o `Docker Compose` já terá criado os containers necessários para a execução do projeto.

O `serviço backend` será executado na porta 3001.

### Executando sem Docker

Caso prefira executar o projeto sem `Docker`, após a instalação das dependências, você pode iniciar a aplicação com o seguinte comando:

```bash
cd Project-Our-Shop-App-Angular

cd backend
npm run dev
```

Este comando inicia o servidor de desenvolvimento e ficará disponível na porta 3001, geralmente acessível através do endereço `http://localhost:3001` no navegador.

É importante lembrar que, ao encontrar problemas durante a instalação ou execução, uma boa prática é verificar as mensagens de erro que aparecem no terminal. Elas geralmente fornecem pistas sobre o que pode estar errado. Também é recomendável manter todas as dependências atualizadas e garantir que seu ambiente de desenvolvimento esteja configurado corretamente. Além disso, é aconselhável consultar a documentação oficial das dependências usadas no projeto em caso de problemas.

Em caso de dúvidas, não hesite em abrir uma [issue](https://github.com/imsamuelcovalero/Desafio_Shopper/issues) no GitHub ou me contatar diretamente. Estou à disposição para ajudar.

Espero que estas instruções sejam úteis para a instalação e execução do projeto. Se houver mais alguma coisa em que eu possa ajudar, por favor, me avise.

[⬆ Voltar ao topo](#sumário)<br>
[⬅ Voltar para a página anterior](../README.md)
