# MAKEFLAGS += --silent

default: watch

.PHONY: lint
lint:
	npm run lint

.PHONY: watch
watch: clean node_modules lint watch
	npm run watch

.PHONY: start
start: node_modules build
	npm start

node_modules:
ifeq ($(MAKECMDGOALS), production-bundle)
	npm ci
else
	npm install
endif

.PHONY: clean-modules
clean-modules:
	rm -rf node_modules/

build: clean
	npm run build -- --mode production

.PHONY: clean
clean:
	rm -rf build/

.PHONY: production-bundle
production-bundle: clean-modules node_modules lint build

.PHONY: test
test: node_modules lint
	npm test

###############################################################################
# Docker
###############################################################################

# These variables are read from .env
APP_NAME    =$(shell grep '^APP_NAME='     .env | awk -F"=" '{print $$2}')
COMPANY_NAME=$(shell grep '^COMPANY_NAME=' .env | awk -F"=" '{print $$2}')
ENVIRONMENT =$(shell grep '^ENVIRONMENT='  .env | awk -F"=" '{print $$2}')
PORT        =$(shell grep '^PORT='         .env | awk -F"=" '{print $$2}')

# These variables are read from package.json
APP_VERSION=$(shell grep '"version": ' package.json | head -1 | cut -d '"' -f 4)

.PHONY: show-variables
show-variables:
	@echo APP_NAME     = $(APP_NAME)
	@echo COMPANY_NAME = $(COMPANY_NAME)
	@echo ENVIRONMENT  = $(ENVIRONMENT)
	@echo APP_VERSION  = $(APP_VERSION)
	@echo PORT         = $(PORT)

.PHONY: docker-image
docker-image:
	docker build \
		-t $(COMPANY_NAME)/$(APP_NAME):latest         \
		-t $(COMPANY_NAME)/$(APP_NAME):$(APP_VERSION) \
		--build-arg COMPANY_NAME=$(COMPANY_NAME)      \
		--build-arg APP_NAME=$(APP_NAME)              \
		./

.PHONY: docker-image-archive
docker-image-archive:
	docker save -o $(APP_NAME):$(APP_VERSION).tar $(COMPANY_NAME)/$(APP_NAME):$(APP_VERSION) && \
	bzip2 -f $(APP_NAME):$(APP_VERSION).tar

.PHONY: docker-image-load
docker-image-load:
	docker load -i $(APP_NAME):$(APP_VERSION).tar

.PHONY: docker-run
docker-run:
	docker run      \
	-e PORT=$(PORT) \
	-p 80:$(PORT)   \
	$(COMPANY_NAME)/$(APP_NAME):latest

.PHONY: compose-up
compose-up:
ifeq ($(ENVIRONMENT), production)
	docker-compose -f docker-compose.yml up --build
else
	docker-compose -f docker-compose.development.yml up --build
endif

.PHONY: compose-down
compose-down:
ifeq ($(ENVIRONMENT), production)
	docker-compose -f docker-compose.yml down --remove-orphans
else
	docker-compose -f docker-compose.development.yml down --remove-orphans
endif
