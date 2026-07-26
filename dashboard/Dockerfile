FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG VITE_HASURA_GRAPHQL_ENDPOINT
ENV VITE_HASURA_GRAPHQL_ENDPOINT=${VITE_HASURA_GRAPHQL_ENDPOINT}
ARG VITE_MAPTILER_KEY
ENV VITE_MAPTILER_KEY=${VITE_MAPTILER_KEY}
RUN npm run build

FROM nginx:1.27.5-alpine AS serve

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build --chown=nginx:nginx /app/dist/ /usr/share/nginx/html/

USER nginx
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
