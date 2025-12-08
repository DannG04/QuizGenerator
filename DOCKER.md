# Docker Deployment Guide

This document explains how to build and run the QuizForge application using Docker.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

### Using Docker Compose (Recommended)

1. Build and start the application:
   ```bash
   docker compose up -d --build
   ```

2. Access the application at: http://localhost:8080

3. Stop the application:
   ```bash
   docker compose down
   ```

### Using Docker CLI

1. Build the Docker image:
   ```bash
   docker build -t quizgenerator .
   ```

2. Run the container:
   ```bash
   docker run -d -p 8080:80 --name quizgenerator quizgenerator
   ```

3. Stop and remove the container:
   ```bash
   docker stop quizgenerator
   docker rm quizgenerator
   ```

## Configuration

### Port Configuration

The application runs on port 80 inside the container. By default, it's mapped to port 8080 on the host machine. You can change this in `docker-compose.yml`:

```yaml
ports:
  - "YOUR_PORT:80"  # Change YOUR_PORT to your preferred port
```

### Health Check

The application includes a health check endpoint at `/health`. The container will be marked as healthy when this endpoint returns a successful response.

You can check the container health with:
```bash
docker ps
```

Or test the health endpoint directly:
```bash
curl http://localhost:8080/health
```

## Architecture

### Multi-Stage Build

The Dockerfile uses a multi-stage build approach:

1. **Builder Stage (node:20)**
   - Installs npm dependencies
   - Builds the Vite/React application
   - Outputs static files to the `dist` folder

2. **Production Stage (nginx:alpine)**
   - Copies built assets from builder stage
   - Serves static files with NGINX
   - Minimal image size for production

### NGINX Configuration

The NGINX configuration includes:
- SPA routing support (redirects all routes to index.html)
- Gzip compression for better performance
- Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- Static asset caching (1 year for JS/CSS/images)
- Health check endpoint

## Troubleshooting

### Build Issues

If you encounter SSL certificate issues during the build, the Dockerfile includes a workaround that temporarily disables strict SSL checking during dependency installation.

### Container Won't Start

1. Check if the port is already in use:
   ```bash
   lsof -i :8080
   ```

2. View container logs:
   ```bash
   docker logs quizgenerator-frontend
   ```

3. Check container status:
   ```bash
   docker ps -a
   ```

### Application Not Accessible

1. Verify the container is running:
   ```bash
   docker ps
   ```

2. Check if the health endpoint responds:
   ```bash
   curl http://localhost:8080/health
   ```

3. Test NGINX is serving files:
   ```bash
   curl http://localhost:8080/
   ```

## Production Deployment

For production deployments, consider:

1. **Using a reverse proxy** (like Traefik or additional NGINX) with SSL/TLS certificates
2. **Setting resource limits** in docker-compose.yml:
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '0.5'
         memory: 512M
   ```
3. **Using Docker secrets** for sensitive configuration
4. **Setting up proper logging** and monitoring
5. **Enabling HTTPS** with SSL certificates

## Files Overview

- `Dockerfile` - Multi-stage build configuration
- `docker-compose.yml` - Docker Compose service definition
- `.dockerignore` - Files excluded from Docker build context
- `nginx.conf` - NGINX server configuration

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [NGINX Documentation](https://nginx.org/en/docs/)
