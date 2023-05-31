FROM node:18.12-alpine

WORKDIR /socket-app

COPY ./package.json .

RUN npm install --omit=dev

COPY . .