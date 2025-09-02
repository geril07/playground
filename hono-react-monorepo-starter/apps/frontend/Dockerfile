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
RUN turbo prune @repo/frontend --docker


FROM base AS installer

COPY --from=builder /app/out/json/ .

RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .

RUN pnpm run build


FROM nginx:1.25-alpine 

# Remove default nginx config and copy custom one
COPY --from=installer /app/apps/frontend/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy build output from previous stage
COPY --from=installer /app/apps/frontend/dist /usr/share/nginx/html

# Expose port 80 and start nginx server
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
