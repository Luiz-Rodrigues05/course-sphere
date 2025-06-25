# Course Sphere

Course Sphere é uma plataforma web para o gerenciamento colaborativo de cursos online.
Este projeto foi desenvolvido como parte do Desafio Front-End.

## ☁️ Deploy e Dados para Teste

### Deploy
A aplicação foi implantada e está disponível para uso no seguinte endereço:

**[https://course-sphere-client.onrender.com/](https://course-sphere-client.onrender.com/)**

O servidor hospedado inativa a aplicação depois de um certo período sem requests, então, para a primeira request, pode demorar um pouco para carregar.

### Dados para Teste
Os dados para teste, incluindo usuários, cursos e aulas, estão disponíveis no arquivo `api/db.json`. Este arquivo é utilizado como banco de dados pelo **JSON Server**.

Para testar a aplicação, você pode utilizar qualquer um dos usuários definidos neste arquivo.

## 🚀 Stack de Tecnologia

A aplicação é construída com uma arquitetura de cliente-servidor, utilizando as seguintes tecnologias:

- **Frontend:**
    - **React (com Hooks):** Para a construção da interface de usuário.
    - **React Router:** Para o gerenciamento de rotas e navegação.
    - **Styled Components:** Para estilização de componentes de forma isolada e dinâmica.
    - **Axios:** Para realizar requisições HTTP ao servidor da API.
    - **React Hook Form:** Para gerenciamento de formulários e validações.
- **Backend (API Mock):**
    - **Node.js:** Ambiente de execução para o servidor.
    - **JSON Server:** Para simular uma API RESTful completa a partir de um arquivo `db.json`.
- **Ambiente de Desenvolvimento:**
    - **Docker & Docker Compose:** Para criar um ambiente de desenvolvimento containerizado e consistente, orquestrando os serviços de frontend e backend.

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:
- [Docker](https://www.docker.com/get-started/) e [Docker Compose](https://docs.docker.com/compose/install/)

## 🏁 Como Executar o Projeto

Para executar o projeto localmente, você deve utilizar o Docker.

### 1. Com Docker (Recomendado)

Na raiz do projeto, execute o seguinte comando:

```bash
docker compose build
```
Isso irá buildar as imagens docker necessárias para o projeto. Em seguida, execute:

```bash
docker compose run --rm client npm install
```
Isso irá instalar as dependências e módulos do projeto, diretamente no container do client. Como ele tem um volume mapeado para o diretório /client, vai ter a pasta de dependências no diretório /client também.

Após isso, verificar se as portas 3000 e 5000 estão disponíveis na máquina. Se não estiverem, você pode facilmente trocar do docker-compose.yml por uma disponível, lembrando de manter a porta da api utilizada na variável REACT_APP_API_URL.

Depois, pode executar:

```bash
docker compose up -d
```

