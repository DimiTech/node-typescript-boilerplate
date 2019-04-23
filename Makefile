# MAKEFLAGS += --silent
.PHONY: watch start clean clean-modules production-bundle

default: watch

lint:
	npm run lint

watch: clean node_modules lint watch
	npm run watch

start: node_modules build
	npm start

node_modules:
ifeq ($(MAKECMDGOALS), production-bundle)
	npm ci
else
	npm install
endif

clean-modules:
	rm -rf node_modules/

build: clean
	npm run build -- --mode production

clean:
	rm -rf build/

production-bundle: clean-modules node_modules lint build

test: node_modules lint build
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

show-variables:
	@echo APP_NAME     = $(APP_NAME)
	@echo COMPANY_NAME = $(COMPANY_NAME)
	@echo ENVIRONMENT  = $(ENVIRONMENT)
	@echo APP_VERSION  = $(APP_VERSION)
	@echo PORT         = $(PORT)

docker-image:
	docker build \
		-t $(COMPANY_NAME)/$(APP_NAME):latest         \
		-t $(COMPANY_NAME)/$(APP_NAME):$(APP_VERSION) \
		--build-arg COMPANY_NAME=$(COMPANY_NAME)      \
		--build-arg APP_NAME=$(APP_NAME)              \
		./

docker-image-archive:
	docker save -o $(APP_NAME):$(APP_VERSION).tar $(COMPANY_NAME)/$(APP_NAME):$(APP_VERSION) && \
	bzip2 -f $(APP_NAME):$(APP_VERSION).tar

docker-image-load:
	docker load -i $(APP_NAME):$(APP_VERSION).tar

docker-run:
	docker run      \
	-e PORT=$(PORT) \
	-p 80:$(PORT)   \
	$(COMPANY_NAME)/$(APP_NAME):latest

compose-up:
ifeq ($(ENVIRONMENT), production)
	docker-compose -f docker-compose.yml up --build
else
	docker-compose -f docker-compose.development.yml up --build
endif
