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
    $query = "SELECT * FROM study WHERE id= :id";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':id', $_POST['id']);
    $statement->execute();
    $rows = $statement->fetchAll();

    //時間換算
    $studytime_m = floor($rows[0]['studytime']/60);
        $studytime_s = $rows[0]['studytime'] % 60;
    $studytime_h = floor($studytime_m/60);
        $studytime_m = $studytime_m % 60;
    $add_studytime_m = floor($rows[0]['additionalstudytime']/60);
        $add_studytime_s = $rows[0]['additionalstudytime'] % 60;
    $add_studytime_h = floor($add_studytime_m/60);
        $add_studytime_m = $add_studytime_m % 60;
    
    //メモ改行対策
    $studymemo = str_replace(["\r\n","\r","\n"], "\\n", $rows[0]['studymemo']);

    echo "{
        studyday: '".$rows[0]['studyday']."',
        input_achievement: ".$rows[0]['achievement'].",
        studytype: ".$rows[0]['studytype'].",
        studytime_h: ".$studytime_h.",
        studytime_m: ".$studytime_m.",
        studytime_s: ".$studytime_s.",
        add_studytime_h: ".$add_studytime_h.",
        add_studytime_m: ".$add_studytime_m.",
        add_studytime_s: ".$add_studytime_s.",
        title: '".$rows[0]['name']."',
        memo_area: '".$studymemo."',
        record_id: ".$rows[0]['id']."
    }";
    
    //データベースとの接続を閉じる
    $pdo = null;
?>