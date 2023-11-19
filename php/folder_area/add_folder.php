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


    //フォルダの追加
    $query = "INSERT INTO study (createday, parentpath, name, type) VALUES (:createday, :parentpath, :name, 0)";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':createday', date('Y/m/d H:i:s'));
    $statement->bindParam(':parentpath', $_POST['path']);
    $statement->bindParam(':name', $_POST['name']);
    $statement->execute();
    
    //データベースとの接続を閉じる
    $pdo = null;
?>