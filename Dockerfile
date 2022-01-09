FROM node:lts-alpine3.15

WORKDIR /usr/nodejs2021q4

COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run lint

CMD ["npm", "start"]