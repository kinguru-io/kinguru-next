FROM node:20-alpine as builder
WORKDIR /app
COPY package.json package-lock.json panda.config.ts ./
COPY src/components ./src/components
COPY src/theme ./src/theme
RUN npm i
COPY . .

ARG SITE_URL
ARG DATABASE_URL
ARG MAPBOX_TOKEN
ARG ES_CLIENT_NODE
ARG ES_CLIENT_API_KEY
ARG ES_INDEX_PREMISE_FULFILLED
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

WORKDIR /app
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/global.d.ts ./
COPY --from=builder /app/instrumentation.ts ./
COPY --from=builder /app/src/lib/shared ./src/lib/shared
COPY --from=builder /app/src/instrumentation.node.ts ./src/instrumentation.node.ts
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/next-env.d.ts ./
COPY --from=builder /app/nextauth.d.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scheduler ./scheduler
COPY --from=builder /app/consumer ./consumer
COPY --from=builder /app/dist ./dist

EXPOSE 3000
