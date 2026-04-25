FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Copy workspace config
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml .npmrc ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/worker/package.json ./apps/worker/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY packages/shared/ ./packages/shared/
COPY apps/worker/ ./apps/worker/
COPY tsconfig.base.json ./

# Generate Prisma client
RUN cd packages/shared && pnpm generate

# Build
RUN cd apps/worker && pnpm build

# Production stage
FROM node:22-alpine AS production
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN npm install -g pm2

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/packages/shared ./packages/shared
COPY --from=base /app/apps/worker/dist ./apps/worker/dist
COPY --from=base /app/apps/worker/package.json ./apps/worker/
COPY --from=base /app/apps/worker/ecosystem.config.cjs ./apps/worker/

WORKDIR /app/apps/worker
CMD ["pm2-runtime", "ecosystem.config.cjs"]
