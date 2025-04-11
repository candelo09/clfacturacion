# 1️⃣ Fase de construcción
# FROM node:20 AS build
# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install --force
# COPY . .

# RUN npm run build --configuration=production --base-href=/clfacturacion/

# # 2️⃣ Fase final
# FROM node:20-alpine
# WORKDIR /app

# # Copiar correctamente la build
# COPY --from=build /app/dist/clfacturacion ./dist/clfacturacion
# COPY --from=build /app/server.js .
# COPY --from=build /app/package.json .
# COPY --from=build /app/node_modules ./node_modules

# EXPOSE 4200
# CMD ["node", "server.js"]


# Fase de construcción
FROM node:23-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build --configuration=production --base-href=/clfacturacion/

# Fase final
FROM node:23-slim
WORKDIR /app

COPY --from=build /app/dist/clfacturacion ./dist/clfacturacion
COPY --from=build /app/server.js ./
COPY --from=build /app/package.json ./
RUN npm ci --omit=dev

EXPOSE 4200
CMD ["node", "server.js"]
