<?php
    //時間表記の変更
    function timecv($time){
        $m = floor($time/60);
            $s = $time % 60;
        $h = floor($m/60);
            $m = $m % 60;
        $d = floor($h/24);
            $h = $h %60;
        
        if($d>0){
            return "{$d}日{$h}時間{$m}分{$s}秒";
        }elseif($h>0){
            return "{$h}時間{$m}分{$s}秒";
        }
        elseif($m>0){
            return "{$m}分{$s}秒";
        }else{
            return "{$s}秒";
        }
    }
?>