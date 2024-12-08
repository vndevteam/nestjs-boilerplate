FROM node:20.18.1-alpine

RUN npm i -g maildev@2.1.0

CMD maildev
