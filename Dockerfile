# Stage 1: Build
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Salin hasil build ke folder yang akan disajikan oleh Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Salin custom nginx config (opsional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]