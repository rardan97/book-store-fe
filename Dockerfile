# Stage 1: Build
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Debug: cek isi folder dist setelah build
RUN ls -la /app/dist

# Stage 2: Serve
FROM nginx:alpine

# Salin hasil build ke folder yang akan disajikan oleh Nginx

COPY --from=builder /app/dist/assets /usr/share/nginx/html/assets
COPY --from=builder /app/dist/src/user-app/index-user.html /usr/share/nginx/html/user.html
COPY --from=builder /app/dist/src/staff-app/index-staff.html /usr/share/nginx/html/staff.html


COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]