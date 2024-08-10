FROM node:18

RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

RUN npm run build 

RUN ls -l dist

EXPOSE 3000

CMD ["node", "dist/main"]
