SHELL := /bin/bash

-include .env

ARGS = $(shell arg="$(call filter-out,$@,$(MAKECMDGOALS))" && echo $${arg:-${1}})

.DEFAULT_GOAL := help

.PHONY: help
help:
	@grep -E '(^.+: ?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-32s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m## /[33m/' && printf "\n"


.PHONY: git.checkout-pull
git.checkout-pull: ## Git checkout to master and pull
	git checkout master && git pull --prune --rebase origin


.PHONY: up
up: ## Run project
	docker compose up --detach --force-recreate --remove-orphans


.PHONY: down
down: ## Shutdown project
	docker compose down --remove-orphans


.PHONY: build
build: ## Build docker images
	docker compose build


.PHONY: update
update: ## Update project
	make git.checkout-pull


.PHONY: test-localhost
test-localhost: ## Run testing on localhost
	docker run --rm --add-host=host.docker.internal:host-gateway --env HOST=http://host.docker.internal -i grafana/k6 run - <run/k6.js
