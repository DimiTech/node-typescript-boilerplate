.PHONY: watch start clean clean-modules production-bundle

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

production-bundle: clean-modules node_modules build
