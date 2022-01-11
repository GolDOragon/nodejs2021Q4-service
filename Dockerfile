FROM node:16-alpine3.14

WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm ci --only-prod

COPY . .

EXPOSE 9229
CMD ["npm", "start"]