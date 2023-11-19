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
    $check_query = "SELECT id FROM study WHERE id= :id";
    $delete_query = "DELETE FROM study WHERE id= :id";

    //親フォルダがあるかチェックして、mysqlにデータを登録
    $statement = $pdo->prepare($check_query);
    $statement->bindParam(':id', $_POST['id']);
    $statement->execute();
    $result = $statement->fetch();
    if ($result) {
        $statement = $pdo->prepare($delete_query);
        $statement->bindParam(':id', $_POST['id']);
        $statement->execute();
    }
    
    //データベースとの接続を閉じる
    $pdo = null;
?>