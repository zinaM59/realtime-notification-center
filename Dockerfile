FROM node:22-alpine AS builder

WORKDIR /app

ARG DATABASE_URL
ARG NEXT_PUBLIC_VAPID_PUBLIC_KEY
ARG NEXT_PUBLIC_APP_URL


ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_VAPID_PUBLIC_KEY=$NEXT_PUBLIC_VAPID_PUBLIC_KEY
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
# Run tests
RUN npm run test:unit
RUN npm run build


FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]