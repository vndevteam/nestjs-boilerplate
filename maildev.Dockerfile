FROM node:22.14.0-alpine

RUN npm i -g maildev@2.1.0

CMD maildev
