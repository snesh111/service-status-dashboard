# Using node.js LTS image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /myapp

# Copying dependency file first 
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the src code
COPY . .

# Expose application port
EXPOSE 5000

# Start the application
CMD ["node","app.js"]
