# FROM node:alpine

# WORKDIR /usr/src/app

# COPY . /usr/src/app

# RUN npm install -g @angular/cli17.3.12

# RUN npm install

# CMD ["ng", "serve", "--host", "0.0.0.0"]

# Usar Node.js 20 como base
FROM node:20

WORKDIR /app

# Copiar archivos y generar el build
COPY package.json package-lock.json ./
RUN npm install --force

COPY . .
RUN npm run build --prod

# Instalar Express.js
RUN npm install express

# Exponer el puerto 4200
EXPOSE 4200

# Comando para iniciar Express
CMD ["node", "server.js", "--host", "0.0.0.0"]


# 1️⃣ Fase de construcción: Angular
FROM node:20 AS build
WORKDIR /app

# Copiar archivos esenciales
COPY package.json package-lock.json ./

# Instalar dependencias sin dependencias de desarrollo
RUN npm install --force

# Copiar el código fuente
COPY . .

# Construir Angular
RUN npm run build --configuration=production --base-href=/clfacturacion/

# 2️⃣ Fase final: Servidor Express ligero
FROM node:20-alpine
WORKDIR /app

# Copiar solo la build de Angular y Express desde la fase anterior
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js .
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules

# Exponer puerto del servidor Express
EXPOSE 4200

# Iniciar servidor Express
CMD ["node", "server.js"]
