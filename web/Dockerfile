FROM node:latest
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY package.json /usr/src/api
RUN npm install
COPY .env ./
COPY ./public ./public
COPY ./src ./src
EXPOSE 3000
CMD ["npm", "start"]
