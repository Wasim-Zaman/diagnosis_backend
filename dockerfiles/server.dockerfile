FROM node:lts-slim

COPY . .

RUN npm install

CMD [ "npm", "start" ]