# Build step
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production step
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Optional: SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
