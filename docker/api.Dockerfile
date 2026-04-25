FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Copy workspace config
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY packages/shared/ ./packages/shared/
COPY apps/api/ ./apps/api/
COPY tsconfig.base.json ./

# Generate Prisma client
RUN cd packages/shared && pnpm generate

# Build
RUN cd apps/api && pnpm build

# Production stage
FROM node:22-alpine AS production
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN npm install -g pm2

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/packages/shared ./packages/shared
COPY --from=base /app/apps/api/dist ./apps/api/dist
COPY --from=base /app/apps/api/package.json ./apps/api/
COPY --from=base /app/apps/api/ecosystem.config.cjs ./apps/api/

WORKDIR /app/apps/api
CMD ["pm2-runtime", "ecosystem.config.cjs"]
