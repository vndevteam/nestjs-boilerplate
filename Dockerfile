##################
# BUILD BASE IMAGE
##################

FROM node:20-alpine AS base

# Install and use pnpm
RUN npm install -g pnpm

#####################
# BUILD BUILDER IMAGE
#####################

FROM base AS builder
WORKDIR /app

COPY . .
COPY package*.json pnpm-lock.yaml ./

RUN pnpm build

######################
# BUILD FOR PRODUCTION
######################

FROM node:20-alpine AS production
WORKDIR /app

RUN mkdir -p src/generated && chmod -R 777 src/generated
COPY --chown=node:node --from=builder /app/src/generated/i18n.generated.ts ./src/generated/i18n.generated.ts
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/package.json ./

USER node

CMD [ "node", "dist/main.js" ]
