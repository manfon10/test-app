FROM --platform=linux/amd64 node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install && npm cache clean --force && npm install -g typescript

COPY ./ ./

CMD [ "npm", "start" ]