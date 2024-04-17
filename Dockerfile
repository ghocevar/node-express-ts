FROM node:20 AS builder
WORKDIR /usr/src/app

RUN corepack enable

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --frozen-lockfile

COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm build

RUN pnpm prune --prod

FROM gcr.io/distroless/nodejs20-debian11
WORKDIR /usr/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.container.json ./package.json

EXPOSE 8000

ENV PORT 8000
ENV NODE_ENV production

CMD ["dist/main.js"]