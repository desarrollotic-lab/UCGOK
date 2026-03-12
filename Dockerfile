# Etapa 1: Construcción (Build)
FROM node:20-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servidor Web (Nginx) para servir la SPA
FROM nginx:alpine

# Configuración de Nginx para Single Page Applications (SPA) como React Router
RUN echo 'server { \
    listen 80; \
    server_name _; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Limpiar el contenido por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos generados desde la etapa de construcción (dist -> nginx)
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto donde corre el contenedor
EXPOSE 80

# Ejecutar nginx en el foreground
CMD ["nginx", "-g", "daemon off;"]
