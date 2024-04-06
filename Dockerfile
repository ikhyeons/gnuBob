FROM node:20

RUN mkdir /usr/src/gnubob
WORKDIR /usr/src/gnubob
COPY package.json ./
RUN npm install
RUN npm install pm2 nodemon ts-node -g

COPY ./ ./

CMD ["npm","run start"]