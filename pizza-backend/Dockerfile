# Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the app (NestJS uses TypeScript)
RUN npm run build

# Expose default NestJS port
EXPOSE 5000

# Run the app
CMD ["npm", "run", "start:prod"]
