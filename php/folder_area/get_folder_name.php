<?php
    if($_POST['path'] == "/"){
        echo "ルートディレクトリ";
    }else{
        //正規表現で親フォルダのIDを抜き出す
        preg_match('/^.*\/([0-9]+)\/$/',$_POST['path'],$id);

        //PDOにセットするdsn等を読込
        require_once "../include_file/pdo_data.php";
        //PDOのインスタンスを生成
        try{
            $pdo = new PDO($dsn, $username, $password);
        }
        catch(PDOEception $e){
            exit();
        }
    
        $query = "SELECT name FROM study WHERE id= :id";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':id', $id[1]);
        $statement->execute();
        $rows = $statement->fetchAll();

        //フォルダ名を表示
        echo $rows[0]['name'];
        
        //データベースとの接続を閉じる
        $pdo = null;
    } 
?>