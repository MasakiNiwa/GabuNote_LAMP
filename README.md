学習分析ノート GabuNote<br>
LAMP上で動作します

【データベースの指定】<br>
php/include_file/pdo_data.php

【テーブル作成】<br>
①MySQLの場合：<br>
CREATE TABLE study (<br>
id INT AUTO_INCREMENT PRIMARY KEY,<br>
createday DATETIME,<br>
parentpath VARCHAR(255),<br>
name VARCHAR(255),<br>
type TINYINT,<br>
studyday DATE,<br>
studytype TINYINT,<br>
studytime INT,<br>
additionalstudytime INT,<br>
achievement TINYINT,<br>
studymemo MEDIUMTEXT);<br>

②SQLiteの場合：<br>
sqlite> create table study (<br>
   ...> id integer primary key autoincrement,<br>
   ...> createday text,<br>
   ...> parentpath text,<br>
   ...> name text,<br>
   ...> type integer,<br>
   ...> studyday text,<br>
   ...> studytype integer,<br>
   ...> studytime integer,<br>
   ...> additionalstudytime integer,<br>
   ...> achievement integer,<br>
   ...> studymemo text);