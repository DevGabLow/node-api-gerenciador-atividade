FROM node:14

WORKDIR /usr/src/app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ["package.json", "package-lock.json*", "./"]

# Adjust localtime and Install dependencies
RUN npm install

COPY . .

# Expose the listening port
EXPOSE 4200

# Run npm start script with PM2 when container starts
CMD [ "node", "./src/index.js" ]