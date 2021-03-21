# 모두의 모임 - 모모 momo backend

## .env example

```
MAINTAINER = xxx # env,Joi,configService 동작을 점검
DATABASE_URL = xxx #  Heroku 에서 제공하는 env key와 동일하게 설정
PORT = 4000 # Heroku 가 제공하는 env key와 동일하게 설정
```

### modules

- common

```
search
1. search term으로 100개까지 조회, page 설정 가능 , 없으면 1
2. search term이 없으면 전부 다 검색한다.
3. 반환으로 총 갯수 및 총 페이지를 출력한다.

pagination
1. page는 필수, 반환으로 총 갯수 및 총 페이지를 출력한다.

=> 생각해 보면 search+pagination을 구현하면 구지 두개를 구현할 필요 없는데 ?
```

- user

```
create-user
update-user
delete-user
user by id
users by pagination
user by search term

```
