FROM node:20-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .

ARG SITE_URL
ARG DATABASE_URL
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_MAPBOX_TOKEN
ARG NEXT_PUBLIC_ELASTICSEARCH_API_KEY
ARG NEXT_PUBLIC_ELASTICSEARCH_ENDPOINT
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NODE_ENV="production"
ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build

FROM node:20-alpine as runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/global.d.ts ./
COPY --from=builder /app/instrumentation.node.ts ./
COPY --from=builder /app/instrumentation.ts ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/next-env.d.ts ./
COPY --from=builder /app/next-i18next.config.cjs ./
COPY --from=builder /app/nextauth.d.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

EXPOSE 3000