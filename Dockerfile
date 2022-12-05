FROM node:14-alpine
WORKDIR /code

COPY package.json package.json 
RUN npm install

EXPOSE 8080
COPY . .
CMD ["node", "index.js"]