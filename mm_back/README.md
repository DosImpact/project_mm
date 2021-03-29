<h1 align="center">Welcome to 호재조 🚀</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

## 주식 AI 로보어드바이저 플랫폼 백앤드

## Install

```sh
yarn install
```

## Setting (.env example)

```
MAINTAINER = xxx # env,Joi,configService 동작을 점검

DATABASE_URL = DATABASE_URL #  Heroku 에서 제공하는 env key와 동일하게 설정
PORT = 4000  # Heroku 가 제공하는 env key와 동일하게 설정
JWT_KEY = JWT_KEY
PYTHON_PATH = pythonPath

REDIS_HOST = localhost
REDIS_PORT = 6379
```

## Usage

```sh
yarn start:dev
```

## Run tests

```sh
yarn test:cov
```
