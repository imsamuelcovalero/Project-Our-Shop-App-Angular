# File: frontend/Dockerfile
FROM node:16.14-alpine

WORKDIR /app-frontend

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"]