FROM node:20

RUN mkdir /usr/src/gnubob
WORKDIR /usr/src/gnubob
COPY package.json ./
ENV ACCEPT_EULA=Y
RUN npm install
RUN npm install pm2 nodemon ts-node -g

RUN apt update
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb

RUN google-chrome --version
COPY ./ ./

CMD ["ts-node", "main.ts"]