#!/bin/bash
#if permission denied : chmod +x start_all.sh
docker-compose -f challenge-addresses/docker-compose.yml up -d
docker-compose -f challenge-carriers/docker-compose.yml up -d
docker-compose -f challenge-front/docker-compose.yml up -d
docker-compose -f challenge-gateway/docker-compose.yml up -d
docker-compose -f challenge-mailer/docker-compose.yml up -d
docker-compose -f challenge-orders/docker-compose.yml up -d
docker-compose -f challenge-payments/docker-compose.yml up -d
docker-compose -f challenge-products/docker-compose.yml up -d
docker-compose -f challenge-publication/docker-compose.yml up -d
docker-compose -f challenge-returns/docker-compose.yml up -d
docker-compose -f challenge-sellers/docker-compose.yml up -d
docker-compose -f challenge-stocks/docker-compose.yml up -d
docker-compose -f challenge-users/docker-compose.yml up -d