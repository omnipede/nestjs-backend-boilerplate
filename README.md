# Nest.js backend server boilerplate

## Description

* [Nest](https://github.com/nestjs/nest) framework TypeScript 을 사용하여 만든 백엔드 API 서버 boilerplate
* 매번 프로젝트 세팅하기 번거로워 만들게 됨

## Installation

```bash
$ npm install
```

## 설정 관련
* 설정은 ```./config``` 폴더에 존재
* 사용할 설정 파일 이름은 ```.env``` 파일의 ```CONFIG_FILE``` 변수로 수정 가능
* ```NODE_ENV``` 환경변수 값에 따라 불러오는 설정 파일의 suffix 가 다름

예를 들어, ```NODE_ENV``` 가 ```dev``` 고, 
```.env``` 파일의 ```CONFIG_FILE``` 변수가 ```application``` 이면
```application.dev.yaml``` 파일을 설정 파일로 사용함

## DB 접속
```yaml
db: # Database connection 설정
  host: 'localhost'
  port: 3306
  username: 'root'
  password: 'password'
  database: 'database_development'
  synchronize: false
  timezone: 'Z'
```

```./config``` 폴더 내부의 yaml 파일의 db property 에 db 접속 정보 존재

## 실행

```bash
# development
$ npm run start

# development (reload)
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 테스트

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```
