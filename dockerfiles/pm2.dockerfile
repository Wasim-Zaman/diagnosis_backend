FROM node:lts-slim

COPY . .

RUN npm install -g pm2

ENTRYPOINT [ "pm2" ]