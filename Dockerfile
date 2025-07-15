FROM node:20

# Set direktori kerja
WORKDIR /app

# Copy file package & install dependensi
COPY package*.json ./
RUN npm install

# Salin semua source code
COPY . .

# Expose port default Vite (5173)
EXPOSE 5173

# Jalankan Vite dev server
CMD ["npm", "run", "dev"]