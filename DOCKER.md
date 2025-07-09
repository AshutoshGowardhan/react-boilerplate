# Docker Setup for React Boilerplate

This guide provides step-by-step instructions for running the React boilerplate project using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed on your system

## Quick Start

### Development Mode

1. **Start development server:**

   ```bash
   docker-compose --profile dev up
   ```

2. **Access the application:**

   - Open your browser and go to `http://localhost:5173`
   - The development server will automatically reload when you make changes

3. **Stop the development server:**
   ```bash
   docker-compose --profile dev down
   ```

### Production Mode

1. **Build and start production server:**

   ```bash
   docker-compose --profile prod up --build
   ```

2. **Access the application:**

   - Open your browser and go to `http://localhost:80` or `http://localhost`

3. **Stop the production server:**
   ```bash
   docker-compose --profile prod down
   ```

## Alternative Docker Commands

### Using Docker directly (without docker-compose)

#### Development

```bash
# Build development image
docker build --target development -t react-boilerplate-dev .

# Run development container
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules react-boilerplate-dev
```

#### Production

```bash
# Build production image
docker build --target production -t react-boilerplate-prod .

# Run production container
docker run -p 80:80 react-boilerplate-prod
```

### Using the simplified development Dockerfile

```bash
# Build using Dockerfile.dev
docker build -f Dockerfile.dev -t react-boilerplate-dev .

# Run development container
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules react-boilerplate-dev
```

## Build Only (without running)

If you just want to build the application without running it:

```bash
docker-compose --profile build up --build
```

This will create a `dist` folder in your project directory with the built application.

## Docker Images Explained

### Multi-stage Dockerfile

- **Development stage**: Uses Node.js with hot reload for development
- **Build stage**: Builds the production-ready application
- **Production stage**: Uses Nginx to serve the built application

### Dockerfile.dev

- Simplified single-stage Dockerfile for development only
- Faster builds for development workflow

## Volume Mounts

In development mode, the following volumes are mounted:

- `.:/app`: Your source code is mounted for live reloading
- `/app/node_modules`: Node modules are preserved in the container

## Ports

- **Development**: Port 5173 (Vite dev server)
- **Production**: Port 80 (Nginx server)

## Environment Variables

You can add environment variables by creating a `.env` file or passing them through docker-compose:

```yaml
environment:
  - NODE_ENV=development
  - VITE_API_URL=http://localhost:3000
```

## Troubleshooting

### Port already in use

If port 5173 or 80 is already in use, you can change the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "3000:5173" # Map host port 3000 to container port 5173
```

### Permission issues

On Linux, you might need to run Docker commands with `sudo` or add your user to the docker group.

### Build cache issues

To rebuild without cache:

```bash
docker-compose --profile dev up --build --no-cache
```

### View logs

```bash
docker-compose --profile dev logs -f
```

## Cleanup

To remove all Docker resources:

```bash
# Stop and remove containers
docker-compose down

# Remove images
docker rmi react-boilerplate-dev react-boilerplate-prod

# Remove all unused Docker resources
docker system prune -a
```
