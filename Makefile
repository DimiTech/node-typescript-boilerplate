MAKEFLAGS += --silent
.PHONY: watch start clean clean-modules production-bundle

# Terminal colors
GREEN = '\033[0;32m'
RED   = '\033[0;31m'
NC    = '\033[0m' # No Color

default: lint watch

lint:
	npm run lint

watch: clean node_modules watch
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

production-bundle: lint clean-modules node_modules build

test: lint node_modules build
	npm start | tail -1 | grep 'Hello World!' && \
		echo $(GREEN)*********************************** PASSED ************************************$(NC) || \
		echo $(RED  )*********************************** FAILED ************************************$(NC)
