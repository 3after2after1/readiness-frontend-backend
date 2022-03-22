FROM node:16-alpine3.14 as builder

LABEL version="1.0"
LABEL description="React Frontend for the readiness-challenge-frontend"

WORKDIR /app

COPY src/ ./src/
COPY public/ ./public/
COPY ./pack*.json ./
COPY create-env-file.sh ./create-env-file.sh

RUN npm install

ARG REACT_APP_FB_APIKEY
ARG REACT_APP_FB_AUTHDOMAI
ARG REACT_APP_FB_PROJECTID
ARG REACT_APP_FB_STORAGEBUCKET
ARG REACT_APP_FB_MESSAGINGSENDERID
ARG REACT_APP_FB_APPID

RUN sh create-env-file.sh REACT_APP_FB_APIKEY="" \
 REACT_APP_FB_AUTHDOMAIN="" \
 REACT_APP_FB_PROJECTID="" \
 REACT_APP_FB_STORAGEBUCKET="" \
 REACT_APP_FB_MESSAGINGSENDERID="" \
 REACT_APP_FB_APPID=""

# ARG REACT_APP_ENDPOINT

# RUN sh create-env-file.sh REACT_APP_ENDPOINT=$REACT_APP_ENDPOINT

RUN cat .env

RUN npm install -g serve

RUN npm run build

# EXPOSE 3000

# CMD ["serve", "-s", "build"]

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html