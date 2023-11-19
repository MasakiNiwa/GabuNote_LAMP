<?php
    //共通関数を読込
    require_once "../include_file/function.php";
    //PDOにセットするdsn等を読込
    require_once "../include_file/pdo_data.php";

    // PDOオブジェクトを作成
    try{
        $pdo = new PDO($dsn, $username, $password);
    }
    catch(PDOEception $e){
        exit();
    }

    //レコードリストブロック生成
    function listBlock($parentpath, $id, $name, $studyday, $achievement, $studytime, $addstudytime){
        echo "<div class='record_list_group'>";
        echo "<input type='hidden' value='".$parentpath.$id."' />";
        echo "<b>".$name."</b><br>";
        echo "学習日: ".$studyday."<br>";
        echo "達成度: ".$achievement."<br>";
        echo "学習時間: ".timecv($studytime)."<br>";
        echo "見直し時間: ".timecv($addstudytime)."<br>";
        echo "</div>";
    }

    //レコードリストをフィルタで切り替えて表示
    if($_POST['filter'] == -1){
        $query = "SELECT * FROM study WHERE type=1 ORDER BY studyday DESC";
        $statement = $pdo->prepare($query);
        $statement->execute();
        $rows = $statement->fetchAll();

        for($i=0; $i<count($rows); $i++){
            listBlock($rows[$i]['parentpath'], $rows[$i]['id'], $rows[$i]['name'], $rows[$i]['studyday'], $rows[$i]['achievement'], $rows[$i]['studytime'], $rows[$i]['additionalstudytime']);
        }
    }else{
        $query = "SELECT * FROM study WHERE type=1 AND achievement={$_POST['filter']} ORDER BY studyday DESC";
        $statement = $pdo->prepare($query);
        $statement->execute();
        $rows = $statement->fetchAll();

        for($i=0; $i<count($rows); $i++){
            listBlock($rows[$i]['parentpath'], $rows[$i]['id'], $rows[$i]['name'], $rows[$i]['studyday'], $rows[$i]['achievement'], $rows[$i]['studytime'], $rows[$i]['additionalstudytime']);
        }
    }

    //データベースとの接続を閉じる
    $pdo = null;
?>