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
    
    //クエリを実行
    $query = "SELECT AVG(achievement) as avg_achievement FROM study WHERE parentpath LIKE :path";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':path', $_POST['path']);
    $statement->execute();
    $rows = $statement->fetchAll();

    //平均達成度の表示
    $num = sprintf("%1.1f",$rows[0]['avg_achievement']);
    echo "達成度 {$num}/5.0<progress max='5' value='{$num}'></progress><br>";
    
    //データベースとの接続を閉じる
    $pdo = null;
?>