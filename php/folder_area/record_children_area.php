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
    $query = "SELECT * FROM study WHERE type=1 AND parentpath= :path ORDER BY studyday, createday";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':path', $_POST['path']);
    $statement->execute();
    $rows = $statement->fetchAll();

    //子レコードの表示
    for($i=0; $i<count($rows); $i++){
        $no = sprintf("%02d",$i+1);
        echo "<div class='records' tabindex='0'>";
        echo "<input type='hidden' value=".$rows[$i]['id']." />";
        echo "<div class='delete_bar border_none flexbox_row'><span>{$no}</span><span class='flexitem_grow'></span><button class='record_delete_btn'>×</button></div>";
        echo "<div class='border_none'>";
        echo "学習日：".$rows[$i]['studyday']."<br>";
        echo "達成度：".$rows[$i]['achievement']." <progress max='5' value='".$rows[$i]['achievement']."'></progress><br>";
        echo "学習時間：".timecv($rows[$i]['studytime'])."<br>";
        echo "見直し時間：".timecv($rows[$i]['additionalstudytime'])."<br>";
        echo "</div>";
        echo "</div>";
    }

    //データベースとの接続を閉じる
    $pdo = null;
?>