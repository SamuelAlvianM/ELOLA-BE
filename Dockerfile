# Use the official Node.js image as a parent image
FROM node:20.11.1-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application's source code
COPY . .

RUN npm rebuild bcrypt --build-from-source

# Build the app
RUN npm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:prod"]
