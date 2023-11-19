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
    $query = "SELECT * FROM study WHERE type=1 AND parentpath= :path ORDER BY studyday, createday";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':path', $_POST['path']);
    $statement->execute();
    $rows = $statement->fetchAll();

    $studyday = [];
    $achievement = [];
    $studytime = [];

    for($i=0; $i<count($rows); $i++){
        $studyday[$i] = "'".$rows[$i]['studyday']."'";
        $achievement[$i] = $rows[$i]['achievement'];
        $studytime[$i] = $rows[$i]['studytime'];
    }

    echo "{
        labels: [";
        for($i=0; $i<count($studyday); $i++){
            if($i==0){
                echo $studyday[$i];
            }else{
                echo ",".$studyday[$i];
            }
        }
        echo "],
        datasets: [{
            type: 'line',
            label: '達成度',
            data: [";
            for($i=0; $i<count($achievement); $i++){
                if($i==0){
                    echo $achievement[$i];
                }else{
                    echo ",".$achievement[$i];
                }
            }
            echo "],
            yAxisID: 'achievement',
            borderWidth: 1
        },{
            type: 'bar',
            label: '学習時間(分)',
            data: [";
            for($i=0; $i<count($studytime); $i++){
                if($i==0){
                    echo floor($studytime[$i]/60);
                }else{
                    echo ",".floor($studytime[$i]/60);
                }
            }
            echo "],
            yAxisID: 'studytime',
            borderWidth: 1
        }]
    }";

    //データベースとの接続を閉じる
    $pdo = null;
?>