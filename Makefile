.PHONY: deploy-dev

deploy-dev: build-dev
	echo 'Deploying to development servers...'
	# TODO: Write the deployment script.

build-dev: 
	npm run build -- --mode development

