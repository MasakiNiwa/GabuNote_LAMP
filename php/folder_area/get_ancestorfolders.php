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

    //POSTで受け取ったデータを変数に入れる
    $path = $_POST['path'];

    $num = 0;
    while($path!='/'){
        //上位フォルダがある場合は、親フォルダパスとフォルダIDを分離
        if(preg_match('/^(.*\/)([0-9]+)\/$/',$path,$id)){
            $query = "SELECT name FROM study WHERE id= :id";
            $statement = $pdo->prepare($query);
            $statement->bindParam(':id', $id[2]);
            $statement->execute();
            $rows = $statement->fetchAll();

            //上位フォルダ名をリストボックスに追加
            //(初回はスキップ)
            if($num!=0){
                echo "<option value='{$id[0]}'>".$rows[0]['name']."</option>";
            }
            //
            $num += 1;
            $path = $id[1];

        }else{
            break;
        }
    }
    echo "<option value='/'>ルートディレクトリ</option>";

    //データベースとの接続を閉じる
    $pdo = null;
?>