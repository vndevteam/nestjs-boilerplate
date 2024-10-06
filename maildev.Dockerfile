FROM node:20.18.0-alpine

RUN npm i -g maildev@2.1.0

CMD maildev
