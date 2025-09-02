FROM node:22-alpine AS base

WORKDIR /app

ENV TURBO_TELEMETRY_DISABLED=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=1

RUN corepack enable pnpm

RUN pnpm install --global turbo@^2


FROM base AS builder

COPY . .

# https://turbo.build/repo/docs/guides/tools/docker#the-solution
RUN turbo prune @repo/backend --docker


FROM base AS installer

COPY --from=builder /app/out/json/ .

RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .

RUN pnpm run build


FROM base AS runner

COPY --from=installer /app .

ENV NODE_ENV=production

CMD ["pnpm", "--filter=@repo/backend", "run", "start"]
