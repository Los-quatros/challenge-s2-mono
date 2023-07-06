FROM node:16-alpine AS app_dev

WORKDIR /app

COPY . .

RUN npm install

ENV REACT_APP_BASE_API_URL=https://api-marketplace.moon-factory.fr
ENV REACT_APP_CAPTCHA_SECRET_KEY=6Lfz6MomAAAAAG8HpQKYPS15kO5piJgeNMguDcw7
ENV REACT_APP_STRIPE_PUBLIC_KEY=pk_test_51IUL0ZLnExjIVJco3CPRbrYaiENzxKGsbEUeA5S5nVxzQHca4fcQ2V7qVbwSqdxFmuAdVBfwDCI0nAMdSLAQsm1X00enddSEAf

EXPOSE 3000

CMD [ "npm", "start" ]

FROM app_dev AS app_build

RUN npm run build

FROM nginx:alpine AS app_prod

COPY --from=app_build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]