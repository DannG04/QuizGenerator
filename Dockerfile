# Stage 1: Build the application
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm config set strict-ssl false && npm install && npm config set strict-ssl true

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
