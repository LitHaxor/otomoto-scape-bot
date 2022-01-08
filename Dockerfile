FROM node:alpine AS builder

ENV NODE_ENV=development

RUN npm i -g @nestjs/cli

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

RUN npm i -g @nestjs/cli

COPY . ./

RUN nest build


## Builder
FROM node:alpine


ENV NODE_ENV=production

RUN npm i -g @nestjs/cli

WORKDIR /app

COPY  --from=builder /app/package.json /app/yarn.lock ./

COPY --from=builder /app/dist ./dist

RUN yarn install -prod

EXPOSE 5000