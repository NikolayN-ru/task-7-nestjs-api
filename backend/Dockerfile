FROM node:16.17

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@8.19.2

RUN npm i -g @nestjs/cli

RUN npm i

ADD . .

EXPOSE 5432

CMD ["node", "dist/main"]