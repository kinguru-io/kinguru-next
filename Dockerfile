FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY global.d.ts ./
COPY instrumentation.node.ts ./
COPY instrumentation.ts ./
COPY next.config.js ./
COPY next-env.d.ts ./
COPY next-i18next.config.js ./
COPY nextauth.d.ts ./
COPY public ./public
COPY prisma ./prisma
COPY .next/standalone ./
COPY .next/static ./.next/static

RUN npm i core-js

EXPOSE 3000
