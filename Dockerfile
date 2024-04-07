FROM node:20

RUN mkdir /usr/src/gnubob
WORKDIR /usr/src/gnubob
COPY package.json ./
ENV ACCEPT_EULA=Y
RUN npm install
RUN npm install pm2 nodemon ts-node -g
RUN apt update
RUN apt-get -y install google-chrome-stable
COPY ./ ./

CMD ["ts-node", "main.ts"]