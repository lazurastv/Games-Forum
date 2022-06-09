FROM node as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx

WORKDIR /usr/src/app

COPY --from=build-stage /app/build/ ./