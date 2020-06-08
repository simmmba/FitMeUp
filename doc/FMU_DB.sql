DROP DATABASE IF EXISTS FMU_DB;
CREATE DATABASE FMU_DB;
USE FMU_DB;

CREATE TABLE USER(
    id INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(10) NOT NULL,
    gender VARCHAR(10),
    age INT,
    nickname VARCHAR(50) NOT NULL UNIQUE,
    portfolio_img VARCHAR(100),
    credit INT DEFAULT 0,
    platform VARCHAR(30),
    api_id VARCHAR(100),
    
    # SYTLIST 부가정보
    name VARCHAR(10),
    belong VARCHAR(30),
    occupation VARCHAR(30),
    phone VARCHAR(30) UNIQUE,
    
    # GENERAL USER 부가정보
    top VARCHAR(100),
    bottom VARCHAR(100),
    height INT,
    weight INT,
    
    
    createdAt DATETIME,
    updatedAt DATETIME
);


CREATE TABLE CONSULT(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    STYLIST_ID INT,
    USER_ID INT,
    CATEGORY VARCHAR(20),
    GENDER VARCHAR(10),
    AGE INT,
    TOP VARCHAR(100),
    BOTTOM VARCHAR(100),
    HEIGHT INT,
    WEIGHT INT,
    BUDGET INT,
    CONTENTS VARCHAR(100),
    START_TIME INT,
    END_TIME INT,
    STATE VARCHAR(100) DEFAULT "REQUESTED",
    APPOINTED VARCHAR(10),
    
    createdAt DATETIME,
    updatedAt DATETIME,

	CONSTRAINT FOREIGN KEY (STYLIST_ID) REFERENCES USER(ID) ON DELETE CASCADE,
	CONSTRAINT FOREIGN KEY (USER_ID) REFERENCES USER(ID) ON DELETE CASCADE
);


CREATE TABLE CONSULT_IMAGE(
	ID INT PRIMARY KEY AUTO_INCREMENT,
    CONSULT_ID INT,
    IMAGE_PATH VARCHAR(50),
    
    createdAt DATETIME,
    updatedAt DATETIME,

    CONSTRAINT FOREIGN KEY (CONSULT_ID) REFERENCES CONSULT(ID) ON DELETE CASCADE
);

CREATE TABLE CONSULT_WANT(
	ID INT PRIMARY KEY AUTO_INCREMENT,
    CONSULT_ID INT,
    VAL VARCHAR(50),
    IMG VARCHAR(50),
    
    createdAt DATETIME,
    updatedAt DATETIME,
    
    CONSTRAINT FOREIGN KEY (CONSULT_ID) REFERENCES CONSULT(ID) ON DELETE CASCADE
);


CREATE TABLE APPLY(
	ID INT PRIMARY KEY AUTO_INCREMENT,
    STYLIST_ID INT,
    CONSULT_ID INT,
    CONTENTS VARCHAR(100),
    STATE VARCHAR(100),
    
    createdAt DATETIME,
    updatedAt DATETIME,
    
    CONSTRAINT FOREIGN KEY (STYLIST_ID) REFERENCES USER(ID) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (CONSULT_ID) REFERENCES CONSULT(ID) ON DELETE CASCADE
);


CREATE TABLE PAYMENT(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    SOURCE INT,
    TYPE VARCHAR(30) NOT NULL,
    TARGET INT,
    AMOUNT INT,
    
    createdAt DATETIME,
    updatedAt DATETIME,

	CONSTRAINT FOREIGN KEY (SOURCE) REFERENCES USER(ID) ON DELETE CASCADE,
	CONSTRAINT FOREIGN KEY (TARGET) REFERENCES USER(ID) ON DELETE CASCADE
);

CREATE TABLE REVIEW(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    USER_ID INT,
    TARGET INT,
    CONSULT_ID INT,
    CONTENTS VARCHAR(1000),
    SCORE DOUBLE,
    
    createdAt DATETIME,
    updatedAt DATETIME,

	CONSTRAINT FOREIGN KEY (USER_ID) REFERENCES USER(ID) ON DELETE CASCADE,
	CONSTRAINT FOREIGN KEY (TARGET) REFERENCES USER(ID) ON DELETE CASCADE,
    CONSTRAINT FOREIGN KEY (CONSULT_ID) REFERENCES CONSULT(ID) ON DELETE CASCADE
);


CREATE TABLE REVIEW_IMAGE(
	ID INT PRIMARY KEY AUTO_INCREMENT,
    REVIEW_ID INT,
    IMAGE_PATH VARCHAR(50),
    
    createdAt DATETIME,
    updatedAt DATETIME,
    
    CONSTRAINT FOREIGN KEY (REVIEW_ID) REFERENCES REVIEW(ID) ON DELETE CASCADE
);

CREATE TABLE MESSAGE(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    SOURCE INT,
    TARGET INT,
    CONTENTS VARCHAR(200),
    READED BOOLEAN DEFAULT FALSE,
    
    createdAt DATETIME,
    updatedAt DATETIME,
    
	CONSTRAINT FOREIGN KEY (SOURCE) REFERENCES USER(ID) ON DELETE CASCADE,
	CONSTRAINT FOREIGN KEY (TARGET) REFERENCES USER(ID) ON DELETE CASCADE
);

CREATE TABLE PORTFOLIO(
	ID INT PRIMARY KEY AUTO_INCREMENT,
    STYLIST_ID INT,
    TITLE VARCHAR(100),
    CONTENTS VARCHAR(2000),
    MAIN_IMG VARCHAR(100),
    COORDI_PRICE INT DEFAULT 0,
    MY_PRICE INT DEFAULT 0,
    
    createdAt DATETIME,
    updatedAt DATETIME,
    
    CONSTRAINT FOREIGN KEY (STYLIST_ID) REFERENCES USER(ID) ON DELETE CASCADE
);


CREATE TABLE PORTFOLIO_TAGS(
	ID INT PRIMARY KEY AUTO_INCREMENT,
    PORTFOLIO_ID INT,
    TAG VARCHAR(20),
    
    createdAt DATETIME,
    updatedAt DATETIME,
    
    CONSTRAINT FOREIGN KEY (PORTFOLIO_ID) REFERENCES PORTFOLIO(ID) ON DELETE CASCADE
);


CREATE TABLE PORTFOLIO_IMAGE(
	ID INT PRIMARY KEY AUTO_INCREMENT,
    PORTFOLIO_ID INT,
    IMAGE_PATH VARCHAR(50),
    
    createdAt DATETIME,
    updatedAt DATETIME,
    
    CONSTRAINT FOREIGN KEY (PORTFOLIO_ID) REFERENCES PORTFOLIO(ID) ON DELETE CASCADE
);

-- SHOW TABLES;
-- SELECT * FROM USER;
-- SELECT * FROM APPLY;
-- SELECT * FROM CONSULT;
-- SELECT * FROM CONSULT_WANT;