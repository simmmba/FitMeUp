USE FMU_DB;

INSERT INTO USER(TYPE, GENDER, AGE, NICKNAME, PROFILE_IMG, CREDIT, PLATFORM, API_ID, NAME, BELONG, OCCUPATION, PHONE, createdAt)
VALUES("General", "Male", 29, "JS_Park", "/default.jpg", 0, "KAKAO", 0000001, "박준성", "SSAFY", "무직", "010-2990-5719", CURRENT_TIMESTAMP);
INSERT INTO USER(TYPE, GENDER, AGE, NICKNAME, PROFILE_IMG, CREDIT, PLATFORM, API_ID, NAME, BELONG, OCCUPATION, PHONE, createdAt)
VALUES("General", "Male", 30, "TJ_Jeong", "/default.jpg", 0, "KAKAO", 0000003, "정택진", "SSAFY", "개발자", "010-2955-3325", CURRENT_TIMESTAMP);
INSERT INTO USER(TYPE, GENDER, AGE, NICKNAME, PROFILE_IMG, CREDIT, PLATFORM, API_ID, NAME, BELONG, OCCUPATION, PHONE, createdAt)
VALUES("General", "Male", 30, "JH_Hwang", "/default.jpg", 0, "KAKAO", 0000004, "황정호", "SSAFY", "아이돌", "010-1234-5678", CURRENT_TIMESTAMP);


INSERT INTO USER(TYPE, GENDER, AGE, NICKNAME, PROFILE_IMG, CREDIT, PLATFORM, API_ID, NAME, BELONG, OCCUPATION, PHONE, createdAt)
VALUES("Stylist", "Female", 29, "준박", "/default.jpg", 0, "KAKAO", 0000002, "박준성", "SSAFY", "무직", "010-2990-5718", CURRENT_TIMESTAMP);
INSERT INTO USER(TYPE, GENDER, AGE, NICKNAME, PROFILE_IMG, CREDIT, PLATFORM, API_ID, NAME, BELONG, OCCUPATION, PHONE, createdAt)
VALUES("Stylist", "Female", 27, "SW_Cho", "/default.jpg", 0, "KAKAO", 0000005, "조서원", "SSAFY", "디자이너", "010-5204-1769", CURRENT_TIMESTAMP);
INSERT INTO USER(TYPE, GENDER, AGE, NICKNAME, PROFILE_IMG, CREDIT, PLATFORM, API_ID, NAME, BELONG, OCCUPATION, PHONE, createdAt)
VALUES("Stylist", "Female", 27, "DE_Song", "/default.jpg", 0, "KAKAO", 0000006, "송다은", "SSAFY", "디자이너", "010-7939-6800", CURRENT_TIMESTAMP);


INSERT INTO CONSULT(USER_ID, CATEGORY, GENDER, TOP, BOTTOM, HEIGHT, WEIGHT, BUDGET, CONTENTS, START_TIME, END_TIME, createdAt)
VALUES(1, "스트릿", "Male", "Large", "31", 180, 71, 100000, "추천해주세요 고맙습니다.", 3, 9, CURRENT_TIMESTAMP);
INSERT INTO CONSULT(USER_ID, CATEGORY, GENDER, TOP, BOTTOM, HEIGHT, WEIGHT, BUDGET, CONTENTS, START_TIME, END_TIME, createdAt)
VALUES(2, "비지니스", "Male", "Large", "28", 185, 73, 200000, "추천해주세요 고맙습니다.", 3, 9,CURRENT_TIMESTAMP);
INSERT INTO CONSULT(USER_ID, CATEGORY, GENDER, TOP, BOTTOM, HEIGHT, WEIGHT, BUDGET, CONTENTS, START_TIME, END_TIME, createdAt)
VALUES(3, "정장", "Male", "Large", "34", 180, 80, 100000, "결혼식 갑니다.", 10, 12, CURRENT_TIMESTAMP);
INSERT INTO CONSULT(USER_ID, STYLIST_ID, CATEGORY, GENDER, TOP, BOTTOM, HEIGHT, WEIGHT, BUDGET, CONTENTS, START_TIME, END_TIME, createdAt)
VALUES(3, 5, "비지니스", "Male", "Large", "34", 180, 80, 100000, "소개팅 갑니다.", 15, 20, CURRENT_TIMESTAMP);


INSERT INTO CONSULT_WANT(CONSULT_ID, VAL,IMG, CREATEDAT)
VALUES(1, "세미오버","/defalut.jpg", CURRENT_TIMESTAMP);
INSERT INTO CONSULT_WANT(CONSULT_ID,  VAL,IMG, CREATEDAT)
VALUES(1, "스트릿","/defalut.jpg", CURRENT_TIMESTAMP);
INSERT INTO CONSULT_WANT(CONSULT_ID,  VAL,IMG,CREATEDAT)
VALUES(1, "무신사","/defalut.jpg", CURRENT_TIMESTAMP);
INSERT INTO CONSULT_WANT(CONSULT_ID,  VAL,IMG,CREATEDAT)
VALUES(2, "TNGT","/defalut.jpg", CURRENT_TIMESTAMP);
INSERT INTO CONSULT_WANT(CONSULT_ID,  VAL,IMG,CREATEDAT)
VALUES(2, "RALPH LAUREN","/defalut.jpg", CURRENT_TIMESTAMP);
INSERT INTO CONSULT_WANT(CONSULT_ID,  VAL,IMG,CREATEDAT)
VALUES(2, "수트","/defalut.jpg", CURRENT_TIMESTAMP);
INSERT INTO CONSULT_WANT(CONSULT_ID,  VAL,IMG,CREATEDAT)
VALUES(3, "Brioni","/defalut.jpg", CURRENT_TIMESTAMP);
INSERT INTO CONSULT_WANT(CONSULT_ID,  VAL,IMG,CREATEDAT)
VALUES(3, "DAKS","/defalut.jpg", CURRENT_TIMESTAMP);
INSERT INTO CONSULT_WANT(CONSULT_ID,  VAL,IMG,CREATEDAT)
VALUES(3, "코트","/defalut.jpg", CURRENT_TIMESTAMP);
INSERT INTO CONSULT_WANT(CONSULT_ID,  VAL,IMG,CREATEDAT)
VALUES(3, "넥타이","/defalut.jpg", CURRENT_TIMESTAMP);
INSERT INTO CONSULT_WANT(CONSULT_ID,  VAL,IMG,CREATEDAT)
VALUES(4, "소개팅","/defalut.jpg", CURRENT_TIMESTAMP);
INSERT INTO CONSULT_WANT(CONSULT_ID,  VAL,IMG,CREATEDAT)
VALUES(4, "깔끔한","/defalut.jpg", CURRENT_TIMESTAMP);
INSERT INTO CONSULT_WANT(CONSULT_ID,  VAL,IMG,CREATEDAT)
VALUES(4, "니트","/defalut.jpg", CURRENT_TIMESTAMP);


INSERT INTO APPLY(STYLIST_ID, CONSULT_ID, createdAt)
VALUES(4, 1, CURRENT_TIMESTAMP);
INSERT INTO APPLY(STYLIST_ID, CONSULT_ID, createdAt)
VALUES(4, 2, CURRENT_TIMESTAMP);
INSERT INTO APPLY(STYLIST_ID, CONSULT_ID, createdAt)
VALUES(5, 3, CURRENT_TIMESTAMP);
INSERT INTO APPLY(STYLIST_ID, CONSULT_ID, createdAt)
VALUES(5, 4, CURRENT_TIMESTAMP);
INSERT INTO APPLY(STYLIST_ID, CONSULT_ID, createdAt)
VALUES(6, 1, CURRENT_TIMESTAMP);
INSERT INTO APPLY(STYLIST_ID, CONSULT_ID, createdAt)
VALUES(6, 4, CURRENT_TIMESTAMP);


INSERT INTO REVIEW(USER_ID, TARGET, CONTENTS, SCORE, createdAt)
VALUES(1, 4, "깔끔하게 잘 코디해주시고 친절하십니다.", 5, CURRENT_TIMESTAMP);
INSERT INTO REVIEW(USER_ID, TARGET, CONTENTS, SCORE, createdAt)
VALUES(2, 4, "ㄳㄳ", 4, CURRENT_TIMESTAMP);
INSERT INTO REVIEW(USER_ID, TARGET, CONTENTS, SCORE, createdAt)
VALUES(3, 4, "추천합니다", 5, CURRENT_TIMESTAMP);
INSERT INTO REVIEW(USER_ID, TARGET, CONTENTS, SCORE, createdAt)
VALUES(1, 5, "깔끔하게 잘 코디해주시고 친절하십니다.", 5, CURRENT_TIMESTAMP);
INSERT INTO REVIEW(USER_ID, TARGET, CONTENTS, SCORE, createdAt)
VALUES(3, 5, "추천합니다", 5, CURRENT_TIMESTAMP);
INSERT INTO REVIEW(USER_ID, TARGET, CONTENTS, SCORE, createdAt)
VALUES(3, 6, "ㄳㄳ", 5, CURRENT_TIMESTAMP);


INSERT INTO MESSAGE(SOURCE, TARGET, CONTENTS, READED, createdAt)
VALUES (1, 4, "요청 확인 부탁드려요.", TRUE, CURRENT_TIMESTAMP);
INSERT INTO MESSAGE(SOURCE, TARGET, CONTENTS, createdAt)
VALUES (4, 1, "확인 했습니다. 연락 주세요.", CURRENT_TIMESTAMP);
INSERT INTO MESSAGE(SOURCE, TARGET, CONTENTS, createdAt)
VALUES (1, 3, "요청 확인 부탁드려요.", CURRENT_TIMESTAMP);


INSERT INTO PORTFOLIO(STYLIST_ID, TITLE, CONTENTS,MAIN_IMG, CREATEDAT)
VALUES(4, "준박 스타일리스트", "본문본문본문본문본문본문본문본문본문본문본문","/default.jpg", CURRENT_TIMESTAMP);
INSERT INTO PORTFOLIO(STYLIST_ID, TITLE, CONTENTS,MAIN_IMG, CREATEDAT)
VALUES(5, "조서원 스타일리스트", "본문본문본문본문본문본문본문본문본문본문본문","/default.jpg", CURRENT_TIMESTAMP);
INSERT INTO PORTFOLIO(STYLIST_ID, TITLE, CONTENTS,MAIN_IMG, CREATEDAT)
VALUES(6, "송다은 스타일리스트", "본문본문본문본문본문본문본문본문본문본문본문","/default.jpg", CURRENT_TIMESTAMP);


INSERT INTO PORTFOLIO_TAGS(PORTFOLIO_ID, TAG, CREATEDAT)
VALUES(1, "정장", CURRENT_TIMESTAMP);
INSERT INTO PORTFOLIO_TAGS(PORTFOLIO_ID, TAG, CREATEDAT)
VALUES(1, "비지니스", CURRENT_TIMESTAMP);
INSERT INTO PORTFOLIO_TAGS(PORTFOLIO_ID, TAG, CREATEDAT)
VALUES(1, "깔끔한", CURRENT_TIMESTAMP);
INSERT INTO PORTFOLIO_TAGS(PORTFOLIO_ID, TAG, CREATEDAT)
VALUES(2, "니트", CURRENT_TIMESTAMP);
INSERT INTO PORTFOLIO_TAGS(PORTFOLIO_ID, TAG, CREATEDAT)
VALUES(2, "맨투맨", CURRENT_TIMESTAMP);
INSERT INTO PORTFOLIO_TAGS(PORTFOLIO_ID, TAG, CREATEDAT)
VALUES(2, "데일리", CURRENT_TIMESTAMP);
INSERT INTO PORTFOLIO_TAGS(PORTFOLIO_ID, TAG, CREATEDAT)
VALUES(3, "디자이너", CURRENT_TIMESTAMP);
INSERT INTO PORTFOLIO_TAGS(PORTFOLIO_ID, TAG, CREATEDAT)
VALUES(3, "패션", CURRENT_TIMESTAMP);
INSERT INTO PORTFOLIO_TAGS(PORTFOLIO_ID, TAG, CREATEDAT)
VALUES(3, "스트릿", CURRENT_TIMESTAMP);