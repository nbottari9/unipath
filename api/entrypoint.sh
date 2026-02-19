#!/bin/sh
set -e

if [ -z "POSTGRES_URL" ]; then
    echo "POSTGRES_URL is not set"
    exit 1
fi

echo "Running initial database migration"
# exec npx mikro-orm migration:up

echo "Starting API server"
# run apollo server
exec node dist/index.js
