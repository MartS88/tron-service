FROM oven/bun:1 AS base


WORKDIR /usr/src/app


COPY package.json bun.lockb ./


RUN bun install


COPY . .


RUN bun run build


CMD ["sh", "-c", "bun migrate && bud seed-all &&  bun run start"]
