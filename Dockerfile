FROM node:14

WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Adjust localtime and Install dependencies
RUN cp /usr/share/zoneinfo/America/Fortaleza /etc/localtime && npm i

# Copy all files
COPY . .

# Build app
RUN npm run build

# Expose the listening port
EXPOSE 4200

# Run npm start script with PM2 when container starts
CMD npm run start
