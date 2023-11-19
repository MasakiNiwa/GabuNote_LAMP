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
    $check_query = 'SELECT id FROM study WHERE id = :id';
    $delete_descendants_query = 'DELETE FROM study WHERE parentpath LIKE :path';
    $delete_folder_query = 'DELETE FROM study WHERE id = :id';

    //親フォルダがあるかチェック
    $statement = $pdo->prepare($check_query);
    $statement->bindParam(':id', $_POST['id']);
    $statement->execute();
    $result = $statement->fetch();
    if ($result) {
        //子孫フォルダと子孫レコードをすべて削除
        $statement = $pdo->prepare($delete_descendants_query);
        $path = $_POST['path']."%";
        $statement->bindParam(':path', $_POST['path']);
        $statement->execute();
        //対象フォルダを削除
        $statement = $pdo->prepare($delete_folder_query);
        $statement->bindParam(':id', $_POST['id']);
        $statement->execute();
    }

    //データベースとの接続を閉じる
    $pdo = null;
?>