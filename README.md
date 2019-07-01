[![Build
Status](https://travis-ci.org/DusanDimitric/node-typescript-boilerplate.svg?branch=master)](https://travis-ci.org/DusanDimitric/node-typescript-boilerplate)

# node-typescript-boilerplate

A starting point for Node.js projects written in TypeScript.

## What this boilerplate includes?

* TypeScript Node.js environment
  - ES6 Modules
  - Source Map Support
  - Absolute path imports
  - Watcher
  - Linting
* Dependency Injection (InversifyJS)
* Dockerization
  - Multi-Stage Build
  - docker-compose (production, development)
* Elegant Web Interface
  - inversify-express-utils
  - Logging
  - Validation & input type checking
* Security
  - Helmet
* Test automation
  - Unit tests (mocha, chai, sinon)
  - Integration Testing Harness (supertest)
  - Coverage (nyc)
* CI (Using TravisCI)
* Config stored in ENV variables (dotenv)

## Configure

### Configure `package.json`

Make sure that you customize the project to your needs. `package.json` is a
**VERY IMPORANT** file since some of it's values have a special meaning and
function.

Make sure to change the version in `package.json` right after you clone the project:
```
{
  ...
  "version": "x.x.x", # Version of your application
  ...
}
```

The other values (such as `name`, `license`, `repository`...) are not crucial,
but make sure to change those as well.

### Configure ENV variables

At the root level of the project there is a `.env.example` that contains some
placeholder values.

Copy `.env.example` to `.env` and insert your own values:

```
$ cp .env.example .env
$ vim .env
NODE_VERSION=12.0.0      # Version of the Node.js engine - used in Dockerfiles
COMPANY_NAME=company     # Used for Docker image tagging and deployment directory creation
APP_NAME=nodejs-app      # Used for Docker image tagging and deployment directory creation
ENVIRONMENT=development  # Used to determine which Docker image to use
PORT=1338                # Port that the app will be exposed on
DB_USER=root             # Database username
DB_PASS=example          # Database password
DB_HOST=mongo            # Database hostname
DB_PORT=27017            # Database port
DB_NAME=admin            # Database name
```

## Run it:

```
make
```

## Docker

```
make compose-up
```

## How-To

### Change App Environment

Change the `ENVIRONMENT` value in `.env` and `.travis.yml`.

Accepted values are `[production|development|testing|...]`

### Change Version of the App

Change the `.version` field in `package.json`.

### Change Version of the Node.js engine

1. Change the `NODE_ENGINE` value in `.env`.
2. Change the `NODE_ENGINE` value in `.env.example`.
3. Change the `NODE_ENGINE` value in `.env.example` output in the README.md file.
4. Change the Node.js version in `.travis.yml`.

Make sure to check DockerHub for corresponding Docker Images.

### Add an ENV variable

1. Add the ENV variable in `.env` -> `EXAMPLE=example`
2. (if required) Add that ENV variable to `Makefile` ENV variables -> `EXAMPLE=$(shell grep '^EXAMPLE=' .env | awk -F"=" '{print $$2}')`
3. (if required) Add that ENV variable to `Makefile` `show-variables` target ->`@echo EXAMPLE = $(EXAMPLE)`
4. (if required) Add that ENV variable to `[web|db].config.ts` -> `process.env.EXAMPLE`
5. (if required) Add that ENV variable to `docker-compose.yml` and (if required) to `Dockerfile`
6. (if required) Add that ENV variable to `docker-compose.development.yml` and (if required) to `Dockerfile.development`
7. Document that ENV variable in this README file
