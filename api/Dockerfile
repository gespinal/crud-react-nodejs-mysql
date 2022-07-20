FROM node:latest
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY index.js ./
COPY .env ./
EXPOSE 3001
CMD ["npm", "run", "devStart"]
