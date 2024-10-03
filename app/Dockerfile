# Використовуємо офіційний образ Node.js
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN ls

RUN npm install

RUN ls
COPY . .

EXPOSE 5000

CMD ["npm", "start"]
