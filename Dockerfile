FROM node:18-alpine as build-image

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src

RUN npm install
RUN npm install typescript
RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=build-image ./usr/src/app/dist ./dist

RUN npm install

COPY . .

CMD ["npm", "start"]