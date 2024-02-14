# Woke Challenge - Frontend in React.js

Esse projeto foi iniciado com [Create React App](https://github.com/facebook/create-react-app).

## Rodando localmente

No diretório do projeto, inicie o servidor local com o comando:

### `npm start`

No endereço [http://localhost:3000](http://localhost:3000) podemos acessar o servidor renderizado localmente.

## Roteamento de páginas

Para organização e roteamento de endereços em componentes, foi utilizado o `react-router-dom`.

### Endereços disponíveis

- `/` - `<Login />` renderiza a interface de login.
- `/home` - `<Home />` renderiza a inteface de dados do usuário.
  - Esse componente é uma rota privada protegida pelo componente `<PrivateRoute />`.

### Rotas privadas

O componente `<PrivateRoute />` protege a página home de usuários não autenticados, redirecionando qualquer acesso não autorizado para a página de Login.

### Autenticação pelo Browser

O método de autenticação no frontend foi simplificado para este MVP, não utilizando sessions para manter os dados do usuário autenticado. Ao invés disso, a autenticação é guardada em um contexto de authenticação do React, fornecido pelo componente provedor `<AuthProvider />` que envolve a aplicação.

## Componentes Principais

### Página de Login (`<Login />`)

Um formulário simples de Login requerindo usuário e senha.

Neste projeto não está previsto um formulário de criação de usuários, sendo assim, para criar um novo usuário, deve-se acessar diretamente o endpoint de criação de usuários na API do Identity(disponível no [readme do backend](https://github.com/Gustavoesm/woke-backend-challenge)).

#### Redirecionamentos

- Ao acessar a pagina de login com um usuário JÁ autenticado, o mesmo será redirecionado para a página com suas informações pessoais (`/home`).
- Ao acessar a pagina de login com um usuário NÃO autenticado, e submeter CORRETAMENTE os dados para login, o mesmo deverá ser redirecionado para a página com suas informações pessoais (`/home`).
  - Com o login bem sucedido, é retornado um JWT Token de autenticação para utilização em endpoints protegidos no backend.
- Ao acessar a pagina de login com um usuário NÃO autenticado, e submeter INCORRETAMENTE os dados para login, o mesmo será informado com uma mensagem avisando que suas credenciais estão incorretas.

### Página de Informações Pessoais (`<Home />`)

Um formulário apresentando as informações pessoais do usuário, contendo _uma mensagem de boas vindas_ **Nome Completo**, **Telefone**, **Email** e **Data de Nascimento**.

Neste projeto também não está previsto um formulário para inserção de dados pessoais do usuário, sendo assim, para adicionar tais informações à um usuário existente, deve-se acessar diretamente o endpoint de inserção de dados de usuário na API do UserInfo(disponível no [readme do backend](https://github.com/Gustavoesm/woke-backend-challenge)).

#### Redirecionamentos

- Ao acessar a pagina de informações pessoais com um usuário JÁ autenticado, o mesmo terá acesso à suas informações e a possibilidade de enviar seus dados para a empresa de recrutamento desejada entre as opções disponíveis.
  - Essas informações serão consumidas por uma API dummy, que apenas consome os dados e os devolve como resposta, nenhuma ação é efetuada nesta requisição.
    - O objetivo dessa operação é simular o envio das informações para a API de consumo da empresa escolhida, como essas API's não são contempladas neste projeto, nenhuma ação em si é efetuada e apenas é testada essa conexão.
  - Entende-se que os dados pessoais devem ser cadastrados no mesmo processo em que são criadas as credenciais do usuário, como não há tratamento para este caso no backend, é possivel visualizar a página mesmo se o usuário não tiver seus dados pessoais cadastrados na plataforma.
- Ao acessar a pagina de informações pessoais com um usuário NÃO autenticado, o mesmo deverá ser redirecionado para a página de login (`/`).

# Observações

Devido ao prazo de entrega, este MVP será entregue sem implementação de testes unitários e sem a devida atenção à implementação de estilos aos componentes.
Caso haja interesse estender o prazo de entrega, esses pontos podem ser corrigidos em implementações futuras.
