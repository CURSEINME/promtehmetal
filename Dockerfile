FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL
ARG NEXT_PUBLIC_YANDEX_API_KEY
ARG ACCESS_KEY
ARG SECRET_ACCESS_KEY
ARG REGION
ARG BUCKET_NAME
ARG ENDPOINT
ARG SMTP_USER
ARG SMTP_PASSWORD

ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_YANDEX_API_KEY=$NEXT_PUBLIC_YANDEX_API_KEY
ENV ACCESS_KEY=$ACCESS_KEY
ENV SECRET_ACCESS_KEY=$SECRET_ACCESS_KEY
ENV REGION=$REGION
ENV BUCKET_NAME=$BUCKET_NAME
ENV ENDPOINT=$ENDPOINT
ENV SMTP_USER=$SMTP_USER
ENV SMTP_PASSWORD=$SMTP_PASSWORD

RUN npx prisma generate

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN apk add --no-cache curl

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]