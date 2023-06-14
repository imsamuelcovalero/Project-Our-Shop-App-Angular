## Sumário

- [Sumário](#sumário)
- [Contexto](#contexto)
- [Tecnologias e Ferramentas Utilizadas](#tecnologias-e-ferramentas-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
  - [Download do projeto](#download-do-projeto)
  - [Instalar dependências](#instalar-dependências)
- [Executando com Docker](#executando-com-docker)
- [Executando sem Docker](#executando-sem-docker)
- [Lint](#lint)

## Contexto

No lado do __Frontend__, o usuário é capaz de:

- Criar uma conta ou logar na plataforma.
- Navegar por um catálogo de produtos.
- Adicionar produtos ao carrinho de compras.
- Realizar o checkout dos itens no carrinho.
- Escolher um local para retirar o pedido.
- Ver o histórico de pedidos com o valor atual de cashback.
- Personalizar a cor do tema pelo ícone de `Mode`, localizado no cabeçalho.

## Tecnologias e Ferramentas Utilizadas

O `Frontend` foi desenvolvido com o uso das seguintes tecnologias e ferramentas:

- [Angular](https://angular.io/docs): Utilizamos o Angular, um framework JavaScript robusto e amplamente adotado para a criação de aplicações web de página única (SPA). A escolha se deu pelo fato de que o Angular oferece um ecossistema completo, incluindo ferramentas para roteamento, formulários, testes de unidade e end-to-end, entre outras funcionalidades.
- [Angular Material](https://material.angular.io/): O Angular Material foi utilizado para fornecer estilos CSS pré-construídos e componentes de interface do usuário reutilizáveis. Isso ajudou a acelerar o processo de desenvolvimento e garantir a consistência visual em toda a aplicação. Além disso, Angular Material adere aos princípios de design do Material Design da Google, garantindo uma experiência do usuário de alta qualidade.
- [Ngx-toastr](https://www.npmjs.com/package/ngx-toastr): Usamos o ngx-toastr para fornecer feedback ao usuário por meio de notificações.

## Instalação e Execução

### Download do projeto

Primeiro, você precisa fazer o clone do repositório do projeto. Para isso, use o comando:

```bash
git clone git@github.com:imsamuelcovalero/Project-Our-Shop-App-Angular.git
```

### Instalar dependências

Em seguida, navegue até o diretório `frontend` e instale as dependências necessárias com os seguintes comandos:

```bash
cd Project-Our-Shop-App-Angular/frontend

cd frontend
npm install
```

Esses comandos instalam todas as dependências listadas no arquivo `package.json`, que são necessárias para a execução do projeto.

## Executando com Docker

Para executar o projeto utilizando `Docker`, assegure-se de ter o `Docker` e o `Docker Compose` instalados em sua máquina. Em seguida, no diretório raiz do projeto, execute o seguinte comando:
  
```bash
docker-compose up
```

O `serviço frontend` será executado na porta 4200.

**Importante:** Note que se já tiver executado este comando no `backend`, não será necessário executá-lo novamente, pois o `Docker Compose` já terá criado os containers necessários para a execução do projeto.

## Executando sem Docker

Caso prefira executar o projeto sem `Docker`, após a instalação das dependências, você pode iniciar a aplicação com o seguinte comando:
  
```bash
cd Project-Our-Shop-App-Angular

cd frontend
ng serve
```

Este comando inicia o servidor de desenvolvimento e o site ficará disponível na porta 4200, geralmente acessível através do endereço `http://localhost:4200` no navegador.

## Lint

Para verificar a qualidade do código com o linter, use o comando:

```bash
ng lint
```

É importante lembrar que, ao encontrar problemas durante a instalação ou execução, uma boa prática é verificar as mensagens de erro que aparecem no terminal. Elas geralmente fornecem pistas sobre o que pode estar errado. Também é recomendável manter todas as dependências atualizadas e garantir que seu ambiente de desenvolvimento esteja configurado corretamente. Além disso, é aconselhável consultar a documentação oficial das dependências usadas no projeto em caso de problemas.

Em caso de dúvidas, não hesite em abrir uma [issue](https://github.com/imsamuelcovalero/Project-Our-Shop-App-Angular/issues) no GitHub ou me contatar diretamente. Estou à disposição para ajudar.

Espero que essas sugestões tenham sido úteis. Se houver mais alguma coisa em que eu possa ajudar, por favor, me avise.

[⬆ Voltar ao topo](#sumário)<br>
[⬅ Voltar para a página anterior](../README.md)"