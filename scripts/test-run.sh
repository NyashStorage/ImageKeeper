#!/bin/sh

echo "Starting api tests..."
cd ../

echo "Importing variables from env file..."
set -o allexport && source ./.env.test && set +o allexport

echo "Starting Docker DB for tests..."
npm run test:docker:up

echo "Waiting until postgres is up and running..."
sleep 5

echo "Starting tests..."
npm run test

echo "Removing Docker DB for tests..."
npm run test:docker:down
