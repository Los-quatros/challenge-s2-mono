#!/bin/bash
#if permission denied : chmod +x stop_all.sh

docker-compose -f challenge-addresses/docker-compose.yml stop
docker-compose -f challenge-carriers/docker-compose.yml stop
docker-compose -f challenge-front/docker-compose.yml stop
docker-compose -f challenge-gateway/docker-compose.yml stop
docker-compose -f challenge-mailer/docker-compose.yml stop
docker-compose -f challenge-images/docker-compose.yml up -d
docker-compose -f challenge-orders/docker-compose.yml stop
docker-compose -f challenge-payment/docker-compose.yml stop
docker-compose -f challenge-products/docker-compose.yml stop
docker-compose -f challenge-returns/docker-compose.yml stop
docker-compose -f challenge-sellers/docker-compose.yml stop
docker-compose -f challenge-users/docker-compose.yml stop