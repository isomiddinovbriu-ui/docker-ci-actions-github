FROM node:20-alpine

WORKDIR /docker-ci

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 7777

CMD ["node", "app.js"]