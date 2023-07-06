FROM node:16-alpine AS app_dev

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]

FROM app_dev AS app_build

RUN npm run build

FROM nginx:alpine AS app_prod

COPY --from=app_build /app/build /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

COPY .env .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]