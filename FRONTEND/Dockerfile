# Build stage
FROM node:latest AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM nginx:1.26.0-alpine-slim

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html  
# Change build to dist if necessary

CMD ["nginx", "-g", "daemon off;"]
