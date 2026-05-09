FROM node:20-alpine

WORKDIR /app

ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@10.32.1 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

RUN pnpm add -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
