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

    //クエリを用意
    $query = 'SELECT * FROM study WHERE type = 0 AND parentpath = :path ORDER BY name';

    //クエリを実行
    $statement = $pdo->prepare($query);
    $statement->bindParam(':path', $_POST['path']);
    $statement->execute();
    $rows = $statement->fetchAll();

    //フォルダをループ
    for ($i = 0; $i < count($rows); $i++) {
        $query_stats = 'SELECT COUNT(id) AS num, SUM(studytime) AS studytimesum, SUM(additionalstudytime) AS addstudytimesum, MAX(studyday) AS lastday FROM study WHERE type = 1 AND parentpath LIKE :path';
        $no = sprintf("%02d", $i + 1);

        //統計情報を取得
        $folder_path = $_POST['path'] . $rows[$i]['id'] . '/%';
        $statement_stats = $pdo->prepare($query_stats);
        $statement_stats->bindParam(':path', $folder_path);
        $statement_stats->execute();
        $rows_stats = $statement_stats->fetchAll();

        //フォルダを表示
        echo "<div class='folders'>";
        echo "<input type='hidden' value='". $_POST['path'] . $rows[$i]['id'] . "/' />";
        echo "<div class='delete_bar border_none flexbox_row'><span>{$no}</span><span class='flexitem_grow'></span><button class='folder_delete_btn'>×</button></div>";
        echo "<div class='border_none'>";
        echo "<b>" . $rows[$i]['name'] . "</b><br>";
        echo "学習：" . $rows_stats[0]['num'] . "回<br>";
        echo "累計：" . timecv($rows_stats[0]['studytimesum'] + $rows_stats[0]['addstudytimesum']) . "<br>";
        echo "最終日：" . $rows_stats[0]['lastday'];
        echo "</div>";
        echo "</div>";
    }

    //データベースとの接続を閉じる
    $pdo = null;
?>