# Chat em Tempo Real

![Aplicação rodando]()

# Contexto

Aplicação de chat fullstack com frontend criado utilizando NextJs com Typescript, banco de dados MongoDB e websocket com socket.io.

## Técnologias usadas

Front-end:
> Desenvolvido usando: TypeScript, NextJs, React, React-Dom, Socket.io-Client

Back-end:
> Desenvolvido usando: NodeJs, Jest, Supertest, Ts-Jest, Ts-Node-Dev, Dotenv, ExpressJs, JsonWebToken, MongoDB, Rimraf, Typescript

Web-Socket:
> Desenvolvido usando: NodeJs, ExpressJs, Socket.io, Dotenv

## Rodando com Docker

 * Clonando o  repositório:

  ```
  git clone git@github.com:DouglasD18/real-time-chat.git
  cd real-time-chat
  ```

* Rodando docker-compose
  ```
  docker-compose up
  ```

## Rodando sem Docker

### Instalando Dependências

> Backend
```bash
cd backend/ 
npm install
``` 
> Frontend
```bash
cd frontend/
npm install
``` 
> Web-Socket
```bash
cd socket/
npm install
``` 

### Executando aplicação

* Para rodar o backend:

  ```
  cd backend/ && npm start
  ```

* Para rodar os testes do backend:

  ```
  cd backend/ && npm run test
  ```

* Para rodar o frontend:

  ```
    cd frontend/ && npm run dev
  ```

* Para rodar o web-socket:

  ```
    cd socket/ && npm start
  ```

Aplicação rodando na porta http://localhost:3000/