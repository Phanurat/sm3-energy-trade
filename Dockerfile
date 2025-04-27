# Use the official Node.js image with version 18+
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app
COPY . .

# Expose port
EXPOSE 3000

# Command to run your app
CMD ["npm", "start"]
