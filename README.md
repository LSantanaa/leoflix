# Leo Flix

 * Versão Atual: 1.2
 * Data da última atualização:  24/09/2023
 * Desenvolvedor: Leonardo de Sant Ana
 * UI/UX: Leonardo de Sant Ana

### Notas da vesão 1.2

* Adição das funções de edição ou exclusão de vídeos individualmente.
* Correção de bugs
* Prevenção a erros na aplicação em caso de exclusão de videos destaque e ou todos videos de uma categoria destaque (altera automáticamente os vídeos destaque caso seja excluído, o mesmo com as categorias.)

### Projeto criado com o CRA (Create-React-App). 

O projeto foi realizado durante o programa ONE (turma 5) da Alura + Oracle, como um challenge de desafio.

Aqui pude aprofundar os conhecimentos adquiridos na formação React da Alura, e criar uma interface de um streaming de trailers, com base em links do Youtube.
No projeto você pode adicionar vídeos e categorias de sua preferência e criar seu próprio streaming de vídeos.

Adicionei funcionalidades diferentes do desafio tornando o projeto mais dinâmico e personalizavel, e aqui estão algumas curiosidades e funcionalidades que implementei:

* A url que o usuário inserir, se for do youtube, irá gerar automáticamente uma url da imagem defautl com base no id do vídeo e o mesmo ocorre com o link Embed, isso é possível graças a uma regular expression que verifica a url e resgata o ID do vídeo no youtube.

* Existe uma função provida pela biblioteca Polished, que verifica o contraste do entre texto e cor de fundo da categoria selecionada pelo usuário, com base nas orientações da W3C. Se o contraste for menor que 4.5, o texto no nome da categoria mudara para cor preta, se for igual ou maior, se manterá na cor default, branca. Isso torna o projeto um pouco mais acessível, minando dificuldades de leitura devido ao contraste ruim.

* Você pode escolher qual categoria e vídeo vai ser exibido na home do projeto, além de poder alterar as cores das categorias, editar as informações dos vídeos, excluir vídeos e categorias.

* Um botão de resetar a aplicação foi inserida para caso o usuário desejar retornar ao estado default da aplicação

* As informações inciais são providas de um arquivo db.json, e armezadas em localhost, a partir do primeiro acesso, toda aplicação gira em torno do localhost, seja na hora de adicionar, editar ou excluir, tornando os dados persistentes mesmo com recarregamento ou fechamento de página.

### Techs

**Código**

* HTML
* CSS
* Javascript
* [React](https://react.dev)
* [Node JS](https://nodejs.org)

**Bibliotecas auxiliares**

* [Material UI](https://mui.com) - Alguns componentes e ícones.
* [React Router Dom](https://reactrouter.com/en/main) - SPA com sistema de rotas
* [UUID](https://www.npmjs.com/package/uuid) - Atribuição de ID's automáticos na adição de categorias ou vídeos.
* [Polished](https://polished.js.org/docs/) - Usado para definir cor do texto com base no contraste entre background
 
**Inspiração de Layout**

* [Figma](https://www.figma.com/file/kg8jj2HgSDV9efuhoDtta5/AluraFlix-PT?node-id=1%3A432&mode=dev) - AluraFlix

**Deploy**

* Github
* [Vercel](https://vercel.com)