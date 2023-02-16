FROM node:19.6.0-alpine3.17

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN apk update
RUN apk add nodejs
#RUN rm -f package-lock.json
RUN apk add npm

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["nodemon"]