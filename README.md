# Aplicação para Consumir a API Rick and Morty

![portal rick and morty](./img/rick-and-morty-portal.png)

### O que foi feito no projeto

Foi criada uma aplicação Web para listagem dos personagens da série Rick and Morty. Com paginação e mecanismo de pesquisa.

Utilizei a bliblioteca Axios para fazer o consumo da API. A biblioteca Bootstrap para estilização dos elementos. Além disso, também fiz uma versão com Fetch para praticar com a ferramenta nativa do JavaScript (atualmente está versão está imcompleta!).

#### Como trabalhar com o repositório

Fiz estilizações com o uso do [SASS](https://sass-lang.com/), por isso, assim que baixar o projeto certifique-se de fazer as instalações das dependências necessárias para rodá-lo, siga os seguintes comandos:

- ```npm i bootstrap@5.3.2``` ou
- ```yarn add bootstrap@5.3.2``` caso não tenha o SASS instalado utilize o seguinte comando:
- ```npm install sass```

#### Listagem de personagens Rick and Morty

**Para isso foi criado:**

- 1 página HTML para listar os personagens;
- 1 MODAL para detalhar os personagens;
- 1 ou mais arquivos CSS para estilização dos
  elementos;
- 1 ou mais arquivos Javascript para tornar as
  páginas dinâmicas.

#### Foi utilizado no projeto

- Para listagem dos personagens [API do Rick and Morty](https://rickandmortyapi.com/);
- [Documentação da API](https://rickandmortyapi.com/documentation/#rest);
- [Biclioteca AXIOS](https://axios-http.com/ptbr/docs/intro).
- [Biblioteca Bootstrap](https://getbootstrap.com/)

#### Regras de Negócio

A lista de personagens foi construída com:
- As informações básicas de cada
personagem (nome, status e espécie);
- A imagem de cada personagem;
- Link para abrir a página de detalhes de
cada personagem;
- Paginação.

O MODAL com detalhamentos dos personagens é dinâmica e possui:
- A imagem e as informações básicas do
personagem (nome, status e espécie);
- As informações sobre a localização do
personagem;
- Um botão para voltar à tela da lista (close).

A página contem animações:
- Pelo menos 3 animações.
- @keyframes com diferentes pontos de parada.
- Uso de easings e do cubic-bezier.

Contem elementos do Bootstrap:
- Grid System;
- Utility Classes;
- Componentes (Buttons, alerts, modais, formulários, pagination, etc).

#### Layout das páginas
- Possuir responsividade:
- Adaptada a tamanhos grandes e pequenos de tela.
