# MAKEFLAGS += --silent
.PHONY: watch start clean clean-modules production-bundle

# TODO: Remove once real tests are in place
# Terminal colors
GREEN = '\033[0;32m'
RED   = '\033[0;31m'
NC    = '\033[0m' # No Color

default: watch

lint:
	npm run lint

watch: clean node_modules lint watch
	npm run build -- -w --mode development

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
	# TODO: Remove once real tests are in place
	npm start | tail -1 | grep -w -e '^Hello World!$$' && \
		(echo $(GREEN)*********************************** PASSED ************************************$(NC); exit 0) || \
		(echo $(RED)*********************************** FAILED ************************************$(NC); exit 1)

###############################################################################
# Docker
###############################################################################

# These variables come from package.json
NODE_VERSION=$(shell grep -A 10 '"engines": ' package.json | grep -m 1 '"node":' | cut -d '"' -f 4)
APP_VERSION =$(shell grep '"version": '       package.json | head -1 | cut -d '"' -f 4)
APP_NAME    =$(shell grep '"name": '          package.json | head -1 | cut -d '"' -f 4)
COMPANY_NAME=$(shell grep '"company": '       package.json | head -1 | cut -d '"' -f 4)

show-variables:
	@echo NODE_VERSION = $(NODE_VERSION)
	@echo APP_VERSION  = $(APP_VERSION)
	@echo APP_NAME     = $(APP_NAME)
	@echo COMPANY_NAME = $(COMPANY_NAME)

docker-image:
	docker build \
		-t $(COMPANY_NAME)/$(APP_NAME):latest         \
		-t $(COMPANY_NAME)/$(APP_NAME):$(APP_VERSION) \
		--build-arg NODE_VERSION=$(NODE_VERSION)      \
		--build-arg COMPANY_NAME=$(COMPANY_NAME)      \
		--build-arg APP_NAME=$(APP_NAME)              \
		./

docker-image-archive:
	docker save -o $(APP_NAME):$(APP_VERSION).tar $(COMPANY_NAME)/$(APP_NAME):$(APP_VERSION) && \
	bzip2 -f $(APP_NAME):$(APP_VERSION).tar

docker-image-load:
	docker load -i $(APP_NAME):$(APP_VERSION).tar

docker-run:
	docker run $(COMPANY_NAME)/$(APP_NAME):latest
