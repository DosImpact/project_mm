# 모두의 모임 - 모모 momo backend

### modules

- pyshell

```
파이썬 실행 모듈
큐잉 모듈
pubsub 모듈

알고리즘 :

1작업 등록, REST API 요청-pub(등록)-큐(등록)-DB(등록 userid,taskid,result)
- manager ? ( 실행을 담당 | 프로듀셔 | 컨슈머 | pubsub | db  )
2작업 시작|진행, 큐(실행)-이벤트리슨(pub(진행중))
3작업 종료|애러, 큐(종료)-이벤트리슨(pub(종료)) - DB(등록,)

? 작업을 어떻게 구분해야할지 모르겠다.
- 추상화 : 작업요청|확인|결과가져오기
- 컨벤션 : 모듈이름을 가진 서비스가 추상화된 서비스 함수
+ 서브 테스크는 서브 서비스 만들어서 고 (  )

```

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
