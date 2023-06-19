.PHONY: start stop

start:
	docker-compose up -d

stop:
	docker-compose down --remove-orphans --volumes --timeout 0

restart: stop start