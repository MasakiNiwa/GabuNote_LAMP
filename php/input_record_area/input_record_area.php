<?php
    //PDOにセットするdsn等を読込
    require_once "../include_file/pdo_data.php";
    //PDOのインスタンスを生成
    try{
        $pdo = new PDO($dsn, $username, $password);
    }
    catch(PDOEception $e){
        exit();
    }

    //クエリを用意
    $insert_query = 'INSERT INTO study (createday, parentpath, name, type, studyday, studytype, studytime, additionalstudytime, achievement, studymemo) VALUES (:createday, :parentpath, :title, 1, :studyday, :studytype, :studytime, :addstudytime, :achievement, :memo)';
    $update_query = 'UPDATE study SET
        name=:title,
        studyday=:studyday,
        studytype=:studytype,
        studytime=:studytime,
        additionalstudytime=:addstudytime,
        achievement=:achievement,
        studymemo=:memo
        WHERE id = :id';

    //mysqlにデータを登録
    if ($_POST['id'] == -1) {
        //新規登録
        $statement = $pdo->prepare($insert_query);
        $statement->bindParam(':createday', date('Y/m/d H:i:s'));
        $statement->bindParam(':parentpath', $_POST['parentpath']);
        $statement->bindParam(':title', $_POST['title']);
        $statement->bindParam(':studyday', $_POST['studyday']);
        $statement->bindParam(':studytype', $_POST['studytype']);
        $statement->bindParam(':studytime', $_POST['studytime']);
        $statement->bindParam(':addstudytime', $_POST['addstudytime']);
        $statement->bindParam(':achievement', $_POST['achievement']);
        $statement->bindParam(':memo', $_POST['memo']);
        $statement->execute();
    } else {
        //指定レコードを更新
        $statement = $pdo->prepare($update_query);
        $statement->bindParam(':title', $_POST['title']);
        $statement->bindParam(':studyday', $_POST['studyday']);
        $statement->bindParam(':studytype', $_POST['studytype']);
        $statement->bindParam(':studytime', $_POST['studytime']);
        $statement->bindParam(':addstudytime', $_POST['addstudytime']);
        $statement->bindParam(':achievement', $_POST['achievement']);
        $statement->bindParam(':memo', $_POST['memo']);
        $statement->bindParam(':id', $_POST['id']);
        $statement->execute();
    }

    //データベースとの接続を閉じる
    $pdo = null;
?>