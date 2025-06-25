# Course Sphere

Course Sphere é uma plataforma web para o gerenciamento colaborativo de cursos online. 
Este projeto foi desenvolvido como parte do Desafio Front-End.


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
- [Node.js](https://nodejs.org/en/) (versão 14.x ou superior)
- [Docker](https://www.docker.com/get-started/) e [Docker Compose](https://docs.docker.com/compose/install/)

## 🏁 Como Executar o Projeto

Você pode executar o projeto de duas maneiras: utilizando Docker (recomendado) ou localmente.

### 1. Com Docker (Recomendado)

A forma mais simples de subir a aplicação completa (frontend e backend) é com o Docker Compose.

Na raiz do projeto, execute o seguinte comando:

```bash
docker-compose up --build