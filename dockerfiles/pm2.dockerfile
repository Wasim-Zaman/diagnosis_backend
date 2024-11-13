FROM node:lts-slim

WORKDIR /app

COPY . .

RUN npm install -g pm2

ENTRYPOINT [ "pm2" ]