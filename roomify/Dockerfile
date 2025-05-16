# Use official Node.js image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose port for Vite
EXPOSE 5173

# Start Vite dev server on all interfaces
CMD ["npm", "run", "dev", "--", "--host"]
