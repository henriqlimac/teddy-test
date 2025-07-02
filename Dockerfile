FROM node:24-alpine AS build

WORKDIR /app

# Install dependencies (use Docker cache efficiently)
COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

# Copy the rest of the source code
COPY . .

# Build the Angular app in production mode
RUN npm run build -- --configuration production \
    && mkdir /output \
    && cp -a dist/*/. /output/

# Production stage
FROM nginx:1.29.0-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/teddy-test/browser /usr/share/nginx/html

EXPOSE 80

#docker build -t teddy-test .
#docker run -d -p 80:80 teddy-test