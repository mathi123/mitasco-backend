FROM node:7.7.3

RUN mkdir /usr/app

COPY . /usr/app

WORKDIR /usr/app

RUN npm install

RUN ./setup-postgresql.sh

RUN ./node_modules/sequelize-cli/bin/sequelize db:migrate

EXPOSE 3000

CMD [ "npm" , "start" ]