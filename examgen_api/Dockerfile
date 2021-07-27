FROM node:alpine

# Create app directory
RUN mkdir /server

# Changing workdir
WORKDIR /server

RUN npm install -gq nodemon

# Bundle app source
COPY package*.json ./

# Install npm dependencies
RUN npm install

COPY . ./

RUN npm run build

CMD ["npm", "start"]