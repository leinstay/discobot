start: ## Starts the container
	docker run --rm --name discobot -v $(shell pwd):/usr/src/bot -v exclude:/usr/src/bot/node_modules/ discobot

build: ## Builds the container
	docker build -t discobot .

stop: ## Stops the container
	docker stop discobot

restart: stop start ## Restart container

