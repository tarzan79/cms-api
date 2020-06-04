FROM node:7.7.2-alpine
WORKDIR /usr/app
COPY package.json .
# RUN apt install python
# RUN npm install --quiet
COPY . .