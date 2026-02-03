# Build stage
FROM node:22-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Remove old lock file and install fresh dependencies
RUN rm -f package-lock.json && npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Run stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built files from build stage
COPY --from=build --chown=nginx:nginx /app/dist/SpotiBye/browser /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set proper permissions
RUN chmod -R 755 /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
