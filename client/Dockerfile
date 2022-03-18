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

RUN sh create-env-file.sh REACT_APP_FB_APIKEY="AIzaSyCul7R9BUWqXQpDadxLPy7wFEmnapAD0mU" \
 REACT_APP_FB_AUTHDOMAIN="trexservices-5fe1c.firebaseapp.com" \
 REACT_APP_FB_PROJECTID="trexservices-5fe1c" \
 REACT_APP_FB_STORAGEBUCKET="trexservices-5fe1c.appspot.com" \
 REACT_APP_FB_MESSAGINGSENDERID="540922506377" \
 REACT_APP_FB_APPID="1:540922506377:web:b6851e9a471df5cc022a58"

# ARG REACT_APP_ENDPOINT

# RUN sh create-env-file.sh REACT_APP_ENDPOINT=$REACT_APP_ENDPOINT

RUN cat .env

RUN npm install -g serve

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]

# FROM nginx
# EXPOSE 3000
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/build /usr/share/nginx/html