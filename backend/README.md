# Backend

#### 1. How to run

```
npm install
npm install -g sequelize-auto
npm install -g mysql
npm start
```



#### 2. 디렉토리 구조  

- config : DB 설정

- controllers : DB 접근 및 관리
- models : table 정의, data 객체

- views : 무쓸모, back 작동 확인 용
- routes : 각 controllers 별 라우팅, API 경로 
- .env : 환경 변수 설정 - 포트 ,DB 환경, 파일 경로 등 - process.env.변수 로 접근 가능



#### 3.  마이그레이션

```
sequelize-auto -o "./models" -d fmu -h yourhost -u root -p 3306 -x yourpassword -e mysql
```

- sequlize-auto, mysql을 global 설치 후 위 명령어를 통해 DB로 부터 model들을 생성할 수 있다.
- auto-injection 으로 가져오지 못하는 설정이 있다. auto-increment 외에 DB에 설정되어 있다면 문제는 없다.
  - model 간 관계
  - cascade
  - auto-increment (직접 입력)
- auto injection 을 할 경우 기존의 model 파일이 덮어 씌어지므로 다른 경로에 auto injection 후 새로 생성되거나 바뀐 model만 옮겨준다.



#### 4. 주의사항

- DB에서 table을 정의 후 sequlize-auto했을 경우 table 의 column명이 대문자일 때 버그가 발생한다
- table 정의 시 column을 소문자로 작성하거나 auto injection 후 model에서 소문자로 변경하면 해결
- auto-increment 경우 auto-injection 후 직접 작성해줘야 한다.

## 기술스택

_____

- Nodejs - 12.16.3
  - IntelliJ - 2020.1.1 x64
- MySQL - MySQL Workbench
- Jenkins - 2.222.3
- Firebase
- Sequalizer
- JWT