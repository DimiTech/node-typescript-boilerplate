MAKEFLAGS += --silent
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
