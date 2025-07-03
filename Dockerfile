FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

RUN npm run build -- --configuration production \
    && mkdir /output \
    && cp -a dist/*/. /output/

FROM nginx:1.29.0-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/teddy-test/browser /usr/share/nginx/html

EXPOSE 80