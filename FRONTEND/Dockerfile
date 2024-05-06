# Eerste stage: bouw de applicatie
FROM node:latest AS builder

# Stel de werkdirectory in binnen de container
WORKDIR /app

# Kopieer de package.json en package-lock.json naar de werkdirectory
COPY package*.json ./

# Installeer de afhankelijkheden
RUN npm install

# Kopieer de rest van de bestanden naar de werkdirectory
COPY . .

# Bouw de applicatie
RUN npm run build

# Tweede stage: draai de gebouwde applicatie met Nginx
FROM nginx:1.26.0-alpine-slim

# Kopieer de gebouwde bestanden van de vorige stage naar de Nginx image
COPY --from=builder /app/dist /usr/share/nginx/html

# De standaard Nginx configuratiepoort is al 80, dus je hoeft niets te wijzigen

# Start Nginx wanneer de container wordt gestart
CMD ["nginx", "-g", "daemon off;"]
