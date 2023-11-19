<?php
    //共通関数を読込
    require_once "../include_file/function.php";
    //PDOにセットするdsn等を読込
    require_once "../include_file/pdo_data.php";
    //PDOのインスタンスを生成
    try{
        $pdo = new PDO($dsn, $username, $password);
    }
    catch(PDOEception $e){
        exit();
    }
    
    //クエリを実行
    $query = "SELECT SUM(studytime) AS maintime, SUM(additionalstudytime) AS addtime FROM study WHERE parentpath LIKE :path AND type=1";
    $statement = $pdo->prepare($query);
    $path = $_POST['path']."%";
    $statement->bindParam(':path', $path);
    $statement->execute();
    $rows = $statement->fetchAll();
    //合計学習時間の表示
    $time = timecv(($rows[0]['maintime'] + $rows[0]['addtime']));
    echo "合計学習時間：{$time}";
    
    //データベースとの接続を閉じる
    $pdo = null;
?>