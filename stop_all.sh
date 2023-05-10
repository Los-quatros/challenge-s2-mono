#!/bin/bash
#if permission denied : chmod +x stop_all.sh

docker-compose -f challenge-front/docker-compose.yml stop
docker-compose -f challenge-orders/docker-compose.yml stop
docker-compose -f challenge-payments/docker-compose.yml stop
docker-compose -f challenge-products/docker-compose.yml stop
docker-compose -f challenge-publication/docker-compose.yml stop
docker-compose -f challenge-returns/docker-compose.yml stop
docker-compose -f challenge-sellers/docker-compose.yml stop
docker-compose -f challenge-stocks/docker-compose.yml stop
docker-compose -f challenge-users/docker-compose.yml stop