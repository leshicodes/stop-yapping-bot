FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install packages
RUN npm install

# Copy the app code
COPY . .

# Make entrypoint script executable
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Build the project
RUN npm run build

# Expose ports
EXPOSE 3001

# Set the entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]

# Run the application
CMD [ "node", "dist/start-manager.js" ]