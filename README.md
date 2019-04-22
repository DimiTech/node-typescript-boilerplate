[![Build
Status](https://travis-ci.org/DusanDimitric/node-typescript-boilerplate.svg?branch=master)](https://travis-ci.org/DusanDimitric/node-typescript-boilerplate)

# node-typescript-boilerplate

A starting point for Node.js projects written in TypeScript.

## Run it:

```
make
make start
```

## Customize

Make sure that you customize the project to your needs. `package.json` is a
**VERY IMPORANT** file since some of it's values have a special meaning and
function.

The following values are the most important ones so make sure to change them in
`package.json` right after you clone the project:
```
.version       # Version of your application
.name          # Name of your application
.company       # Name of your company
.engines.node  # Node.js version used to run the application
```

The other values (such as `license`, `repository`...) are not crucial, but make
sure to change those as well.

## What this boilerplate includes?

```
* TypeScript Node.js environment
  - ES6 Modules
  - Source Map Support
  - Absolute path imports
  - Watcher
* Linting
* Dependency Injection (InversifyJS)
* Dockerization
  - Multi-Stage Build
  - Development Volume - Source Code Watcher (TODO: Implement)
  - docker-compose ready (TODO: Implement)
* Web Interface (Express.js)
* CI (Using TravisCI)
* Test automation
  - Unit tests (mocha, chai, sinon)
  - Coverage (nyc)
* Config stored in ENV variables (dotenv)
* Test harness  (TODO: Implement)
* Validation    (TODO: Implement)
```
