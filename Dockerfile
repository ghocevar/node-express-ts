FROM node:18 AS builder
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile

COPY . .
RUN pnpm build

RUN pnpm prune --prod

FROM gcr.io/distroless/nodejs18-debian11
WORKDIR /usr/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 8000
CMD ["dist/main.js"]