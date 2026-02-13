# use node image
FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

# install dependencies
RUN npm ci

COPY . .

RUN npm run build


FROM node:20-alpine AS runtime

# create non-root user for running the app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./next/static
COPY --from=builder /app/public ./public

USER appuser

EXPOSE 3000

CMD ["node", "server.js"]