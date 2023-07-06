FROM node:16-alpine AS app_dev

WORKDIR /app

COPY . .

ENV  REACT_APP_BASE_API_URL=http://146.148.122.41:4000   

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]

FROM app_dev AS app_build

RUN npm run build

FROM nginx:alpine AS app_prod

COPY --from=app_build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]