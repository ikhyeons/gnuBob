FROM node:20

RUN mkdir /usr/src/gnubob
WORKDIR /usr/src/gnubob
COPY package.json ./
ENV ACCEPT_EULA=Y
RUN npm install
RUN npm install pm2 nodemon ts-node -g

#RUN wget https://chromedriver.storage.googleapis.com/78.0.3904.70/chromedriver_linux64.zip
#RUN unzip chromedriver_linux64.zip
#RUN mv chromedriver /usr/bin/chromedriver
#RUN chown root:root /usr/bin/chromedriver
#RUN chmod -x /usr/bin/chromedriver

COPY ./ ./
CMD ["ts-node", "main.ts"]