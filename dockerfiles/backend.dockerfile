FROM node:20

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g pm2

ENTRYPOINT [ "pm2" ]