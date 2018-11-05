.PHONY: start clean-build clean-modules

start: clean-build node_modules build
	npm start

build:
	npm run build -- --mode production

node_modules:
	npm i

clean-build:
	rm -rf build/

clean-modules:
	rm -rf node_modules/
