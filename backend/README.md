## Sumário

- [Sumário](#sumário)
- [Contexto](#contexto)
- [Regras de Negócio](#regras-de-negócio)
- [Banco de Dados](#banco-de-dados)
  - [Diagrama](#diagrama)
- [API](#api)
  - [POST /products](#post-products)
  - [PATCH /products](#patch-products)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
  - [Download do projeto](#download-do-projeto)
  - [Instalar dependências](#instalar-dependências)
  - [Executando com Docker](#executando-com-docker)
  - [Executando sem Docker](#executando-sem-docker)

## Contexto

Neste projeto, o __Backend__desempenha diversas funções fundamentais, tais como:

- Montar a estrutura inicial das tabelas e relações através do `Sequelize`. Uma [funcionalidade __extra__](https://github.com/imsamuelcovalero/Desafio_Shopper/blob/main/backend/src/services/DatabaseImportService/README_ImportSQL.md) foi criada para oferecer algumas formas de popular o `banco de dados`. Também foram criados diversos `scripts` no `package.json` para cuidar da organização e inicialização correta da aplicação.
- Receber o conteúdo do arquivo CSV proveniente da interação com o botão `VALIDAR`, verificar a integridade inicial dos dados e, em seguida, consultar o `banco de dados` e aplicar as devidas regras de negócio.
- Devolver para o `Frontend` as informações pertinentes, a serem exibidas para o usuário.
- Ao receber o sinal proveniente da interação com o botão `ATUALIZAR`, gravar as novas informações no `banco de dados`.

## Regras de Negócio

Em qualquer empresa de e-commerce, é essencial que os usuários possam atualizar os preços de suas lojas para se manterem competitivos e manterem seus preços alinhados com os custos de operação. Essa tarefa parece simples, porém, quando falamos de lojas com milhares de produtos, se torna essencial a existência de uma ferramenta que permita atualizar os produtos de forma massiva e com recursos adicionais para evitar erros que possam prejudicar o negócio.

Foram identificados diversos requisitos que a ferramenta deve cumprir para satisfazer as necessidades dos diferentes times na empresa:

<details>
<summary>Requisitos levantados</summary>

1. __Time de Compras__: responsável por definir os preços, se comprometeu em gerar um arquivo CSV contendo código do produto e o novo preço que será carregado.
2. __Time Financeiro__: preocupado com o faturamento, solicitou que o sistema impeça que o preço de venda dos produtos fique abaixo do custo deles.
3. __Time de Marketing__: preocupado com o impacto de reajustes nos clientes, solicitou que o sistema impeça qualquer reajuste maior ou menor do que 10% do preço atual do produto.
4. __Produtos em pacotes__: Alguns produtos são vendidos em pacotes, ou seja, um produto que é composto por um ou mais produtos em quantidades diferentes. Estabeleceu-se a regra que, ao reajustar o preço de um pacote, o mesmo arquivo deve conter os reajustes dos preços dos componentes do pacote de modo que o preço final da soma dos componentes seja igual ao preço do pacote.

O sistema deve seguir estas regras para garantir que os preços sejam atualizados corretamente. Caso uma ou mais regras de validação tenham sido quebradas, o sistema também deve exibir ao lado de cada produto qual regra foi quebrada.

</details>

<details>
<summary>Verificações do backend</summary>

```plaintext
Ao clicar em VALIDAR, o sistema deve:

1. Ler todo o arquivo e fazer as seguintes verificações:
   - Todos os campos necessários existem?
   - Os códigos de produtos informados existem?
   - Os preços estão preenchidos e são valores numéricos válidos?
   - O arquivo respeita as regras levantadas na seção CENARIO?

2. Ao final da validação, exibir as seguintes informações dos produtos que foram enviados:
   - Código, Nome, Preço Atual, Novo Preço

3. Caso uma ou mais regras de validação tenham sido quebradas, o sistema também deve exibir ao lado de cada produto qual regra foi quebrada.
```

</details>

## Banco de Dados

O banco de dados foi criado utilizando o `MongoDB` e o `Mongoose` para gerenciar as tabelas e relações. O diagrama abaixo representa a estrutura do banco de dados:

### Diagrama

<div align="center">
  
![Diagrama do banco de dados](https://github.com/imsamuelcovalero/Desafio_Shopper/assets/98184355/cf010ceb-1cb3-4ed9-9d4b-02c9b83ebb13)

</div>
  
## API

### POST /products

Essa rota espera receber um corpo de requisição seguindo o formato abaixo:

<details>
<summary>Clique para visualizar:</summary>

```json
{
  "products": [
    {
      "code": 16,
      "newPrice": 20.00
    }
  ]
}
```
  
</details>
  
Se a validação dos dados for bem-sucedida, a rota retornará um corpo de resposta com `status http 200` similar ao seguinte:

<details>
<summary>Clique para visualizar:</summary>

```json
[
  {
    "code": "16",
    "name": "AZEITE  PORTUGUES  EXTRA VIRGEM GALLO 500ML",
    "currentPrice": "20.49",
    "newPrice": 25.5,
    "status": [ "Reajuste inválido para o produto" ]
  }
]
```

</details>

Os casos de erro foram tratados de duas formas:

<details>
<summary>Clique para visualizar:</summary>

1. O __Joi__ é responsável por validar o corpo da requisição. Caso o corpo da requisição não esteja no formato esperado, contendo o código e novo preço em todos os itens, o __Joi__ retornará um erro com `status http 400` e a seguinte mensagem:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "All fields must be filled"
}
```

2. Em um segundo momento, no service de produtos, os seguintes erros, caso ocorram, podem ser retornados em uma `array`, para serem exibidos posteriormente pelo `frontend`:

    - 'O novo preço deve ser um número válido'
    - 'Reajuste inválido para o produto'
    - 'Preço de venda abaixo do custo para o produto'
    - 'Produto com código `${productCode}` que faz parte do pacote `${packageCode}` não está presente na lista de novos preços'
    - 'O preço do pacote de código `${packageCode}` não é igual à soma dos preços dos itens que o compõem'
    - 'Pacote com código `${packageCode}` que inclui o produto `${productCode}` não está presente na lista de novos preços'
    - 'Produto com código `${productCode}` não encontrado'
    - 'Produto com código `${productCode}` não encontrado'

Nota: Para os erros assíncronos em geral, foi utilizada uma estrutura de `CustomError`, que garante agilidade e praticidade ao lidar com os erros, lançando ao mesmo tempo o código do erro e a mensagem em uma única string, sendo posteriormente capturados por um `Middleware de Erro`. Essa tratativa foi possível graças ao `express async errors`.

</details>

### PATCH /products

Essa rota também espera receber um corpo de requisição no mesmo formato que o da rota `POST` descrita acima. Se a atualização dos preços no banco de dados for bem-sucedida, a rota retornará `status http 200` e a seguinte mensagem:

```json
"Preços atualizados com sucesso. Novo arquivo pode ser enviado para verificação"
```

## Tecnologias e Ferramentas Utilizadas

Na construção do `Backend`, optamos por utilizar uma variedade de tecnologias e ferramentas, selecionadas por suas vantagens específicas:

- [Node.js](https://nodejs.org/en): A plataforma de desenvolvimento em `JavaScript` foi escolhida para a construção do backend devido à sua alta performance, facilidade de aprendizado e ampla adoção na comunidade de desenvolvimento.
- [TypeScript](https://www.typescriptlang.org/): O `TypeScript` foi utilizado para adicionar tipagem estática ao `JavaScript`, proporcionando um nível extra de segurança e previsibilidade ao código.
- [SQL](https://www.mysql.com/): A linguagem de consulta estruturada foi utilizada para interagir com o banco de dados, devido a sua ampla adoção e robustez comprovada.
- [Joi](https://github.com/sideway/joi): Esta biblioteca de validação de dados em JavaScript foi escolhida por sua facilidade de uso e versatilidade na validação de diversos tipos de dados, incluindo o arquivo CSV importado.
- [Express](https://expressjs.com/): Este `framework web` para `Node.js` foi escolhido devido à sua simplicidade e eficácia na criação de rotas e endpoints do backend.
- [Sequelize](https://sequelize.org/): O `Sequelize`, um ORM (`Object-Relational Mapping`) em `JavaScript`, foi utilizado para facilitar a interação com o banco de dados `MySQL`, tornando o código mais fácil de ler e manter.

## Instalação e Execução

### Download do projeto

Primeiro, você precisa fazer o clone do repositório do projeto. Para isso, use o comando:

```
git clone git@github.com:imsamuelcovalero/Desafio_Shopper.git
```

### Instalar dependências

Em seguida, navegue até o diretório `backend` e instale as dependências necessárias com os seguintes comandos:

```
cd Desafio_Shopper

cd backend
npm install
```

Esses comandos instalam todas as dependências listadas no arquivo `package.json`, que são necessárias para a execução do projeto.

### Executando com Docker

Para executar o projeto utilizando `Docker`, assegure-se de ter o `Docker` e o `Docker Compose` instalados em sua máquina. Em seguida, no diretório raiz do projeto, execute o seguinte comando:

```
docker-compose up -d
```

**Imporante:** Note que se já tiver executado este comando no `frontend`, não será necessário executá-lo novamente, pois o `Docker Compose` já terá criado os containers necessários para a execução do projeto.

O `serviço backend` será executado na porta 3001.

### Executando sem Docker

Caso prefira executar o projeto sem `Docker`, após a instalação das dependências, você pode iniciar a aplicação com o seguinte comando:

```
cd Desafio_Shopper

cd backend
npm run dev
```

Este comando inicia o servidor de desenvolvimento e ficará disponível na porta 3001, geralmente acessível através do endereço `http://localhost:3001` no navegador.

É importante lembrar que, ao encontrar problemas durante a instalação ou execução, uma boa prática é verificar as mensagens de erro que aparecem no terminal. Elas geralmente fornecem pistas sobre o que pode estar errado. Também é recomendável manter todas as dependências atualizadas e garantir que seu ambiente de desenvolvimento esteja configurado corretamente. Além disso, é aconselhável consultar a documentação oficial das dependências usadas no projeto em caso de problemas.

Em caso de dúvidas, não hesite em abrir uma [issue](https://github.com/imsamuelcovalero/Desafio_Shopper/issues) no GitHub ou me contatar diretamente. Estou à disposição para ajudar.

Espero que estas instruções sejam úteis para a instalação e execução do projeto. Se houver mais alguma coisa em que eu possa ajudar, por favor, me avise.

[⬆ Voltar ao topo](#sumário)<br>
[⬅ Voltar para a página anterior](../README.md)
