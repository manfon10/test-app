FROM node:18-alpine as build-image

WORKDIR /usr/src/app

COPY package*.json ./
COPY ./src ./src

RUN npm install

FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=build-image ./usr/src/app/src ./src

RUN npm install

COPY . .

CMD [ "npm", "start" ]