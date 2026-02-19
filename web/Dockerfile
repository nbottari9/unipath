# use official node image with build toolchain
FROM node:20 AS builder

# Set working directory
WORKDIR /app

COPY package*.json ./

# install dependencies
RUN npm ci --only=production=false

COPY . .

RUN npm run build

# prune devDependencies to reduce final artifact size
RUN npm prune --production

FROM node:20-alpine AS runtime

# create a non-root user for running the app
# alpine uses adduser
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app


# copy only the built output and production node_modules from the builder stage
COPY --from=builder /app/.next ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# expose the port
EXPOSE 3000

# give appuser permissions to /app
RUN chown -R appuser:appgroup /app

# use non-root user to run the app
USER appuser

ENTRYPOINT [ "/entrypoint.sh" ]