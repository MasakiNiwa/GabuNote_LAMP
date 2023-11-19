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

    $label = [];
    $totaltime = [];

    //クエリを実行
    $query = "SELECT * FROM study WHERE type=0 AND parentpath= :path ORDER BY name";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':path', $_POST['path']);
    $statement->execute();
    $rows = $statement->fetchAll();

    for($i=0; $i<count($rows); $i++){
        //ラベルの追加
        $label[$i] = $rows[$i]['name'];
        //フォルダ学習時間の取得
        $folder_path = $rows[$i]['parentpath'].$rows[$i]['id']."/%";
        $query_stats = "SELECT COUNT(id) AS num, SUM(studytime) AS studytimesum, SUM(additionalstudytime) AS addstudytimesum FROM study WHERE type=1 AND parentpath LIKE :path";
        $statement = $pdo->prepare($query_stats);
        $statement->bindParam(':path', $folder_path);
        $statement->execute();
        $rows_stats = $statement->fetchAll();
        //データの追加
        $totaltime[$i] = floor(($rows_stats[0]['studytimesum']+$rows_stats[0]['addstudytimesum'])/60);
    }

    echo "{
        labels: [";
        for($i=0; $i<count($label); $i++){
            if($i==0){
                echo "'".$label[$i]."'";
            }else{
                echo ",'".$label[$i]."'";
            }
        }
        echo "],
        datasets: [{
        data: [";
        for($i=0; $i<count($totaltime); $i++){
            if($i==0){
                echo $totaltime[$i];
            }else{
                echo ",".$totaltime[$i];
            }
        }
        echo "]
        }]
    }";

    //データベースとの接続を閉じる
    $pdo = null;
?>