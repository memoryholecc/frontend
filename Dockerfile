FROM node:16-alpine AS builder
WORKDIR /app

# package-lock.json is copied separately to take advantage of docker's build cache
# 'npm ci' will only be rerun if package-lock.json changes
COPY package*.json /app/
RUN npm ci

COPY . /app
ARG GRAPHQL_ENDPOINT="https://api.memoryhole.cc/graphql"
ARG SCRAPER_ROOT="https://importer.memoryhole.cc"
RUN VITE_GRAPHQL_ENDPOINT=${GRAPHQL_ENDPOINT} \
    VITE_SCRAPER_ROOT=${SCRAPER_ROOT} \
    npm run build

FROM nginx:alpine
WORKDIR /app
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80