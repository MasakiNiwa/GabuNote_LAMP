学習分析ノート GabuNote
LAMP上で動作します

【データベースの指定】
php/include_file/pdo_data.php

【テーブル作成】
①MySQLの場合：
CREATE TABLE study (
id INT AUTO_INCREMENT PRIMARY KEY,
createday DATETIME,
parentpath VARCHAR(255),
name VARCHAR(255),
type TINYINT,
studyday DATE,
studytype TINYINT,
studytime INT,
additionalstudytime INT,
achievement TINYINT,
studymemo MEDIUMTEXT);

②SQLiteの場合：
sqlite> create table study (
   ...> id integer primary key autoincrement,
   ...> createday text,
   ...> parentpath text,
   ...> name text,
   ...> type integer,
   ...> studyday text,
   ...> studytype integer,
   ...> studytime integer,
   ...> additionalstudytime integer,
   ...> achievement integer,
   ...> studymemo text);