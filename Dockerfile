# --- Base Image ---
FROM node:20-alpine AS base

WORKDIR /app

# Instala o pnpm globalmente
RUN npm install -g pnpm@latest

# Copia package.json e pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instala TODAS as dependências (incluindo dev)
RUN pnpm install --frozen-lockfile


# --- Development Stage ---
FROM base AS development

WORKDIR /app

# Copia o código-fonte da aplicação
COPY . .

# Exponha a porta (caso seja necessário)
EXPOSE ${PORT}

# Usa pnpm dev para rodar em modo desenvolvimento
CMD ["pnpm", "dev"]
