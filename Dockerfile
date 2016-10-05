FROM nodesource/node:6

RUN npm install -g typings
RUN npm install -g gulp-cli
RUN npm install -g typescript

ADD . .

RUN npm install
RUN npm install --dev
RUN typings install

RUN gulp ts

EXPOSE 3000 
CMD ["node", "server/bin/www"]
