# Use the official Node.js image.
FROM node:18

# Install dependencies
# Install Python, g++, make, and other dependencies required by node-gyp
RUN apt-get update && apt-get install -y python3 g++ make

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Rebuild bcrypt to ensure native bindings are correctly compiled
RUN npm rebuild bcrypt --build-from-source

# Build the application.
RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "run", "start:prod" ]

# Expose the port your app runs on
EXPOSE 3000
