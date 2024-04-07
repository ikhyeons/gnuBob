FROM node:20

RUN mkdir /usr/src/gnubob
WORKDIR /usr/src/gnubob
COPY package.json ./
ENV ACCEPT_EULA=Y
RUN npm install
RUN npm install pm2 nodemon ts-node -g

RUN apt-get -y update
RUN apt install wget
RUN apt install unzip  
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt -y install ./google-chrome-stable_current_amd64.deb
RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/` curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip

RUN mkdir chrome
RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/src/chrome
COPY requirements.txt ./
RUN google-chrome --version

COPY ./ ./
CMD ["ts-node", "main.ts"]