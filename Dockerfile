# Base image
FROM node:20-alpine AS base

WORKDIR /app

# Instala o pnpm globalmente
RUN npm install -g pnpm@latest

# Copia package.json e pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instala as dependências
RUN pnpm install --frozen-lockfile

# --- Target para Desenvolvimento ---
FROM base AS development

WORKDIR /app

# Copia o código da aplicação
COPY . .

# Instala dependências de desenvolvimento (se necessário)
RUN pnpm install --frozen-lockfile

# Comando para rodar em modo de desenvolvimento (com ts-node-dev)
CMD ["pnpm", "dev"]

# --- Target para Produção ---
FROM base AS production

WORKDIR /app

# Copia todo o código, mas não os arquivos de desenvolvimento
COPY . .

# Executa o build para gerar o dist
RUN pnpm build

# Exponha a porta
EXPOSE 3000

# Comando para rodar a aplicação em produção
CMD ["node", "dist/server.js"]
