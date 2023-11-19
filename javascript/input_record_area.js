document.addEventListener('DOMContentLoaded', function(){
    //入力要素を変数にいれる
    let studyday_form = document.getElementById('studyday');
    let achievement_form = document.getElementById('input_achievement');
    let studytype_form = document.getElementById('studytype');
    let studytime_h_form = document.getElementById('studytime_h');
    let studytime_m_form = document.getElementById('studytime_m');
    let studytime_s_form = document.getElementById('studytime_s');
    let add_studytime_h_form = document.getElementById('add_studytime_h');
    let add_studytime_m_form = document.getElementById('add_studytime_m');
    let add_studytime_s_form = document.getElementById('add_studytime_s');
    let title_form = document.getElementById('title');
    let memo_form = document.getElementById('memo_area');
    let parentpath_form = document.getElementById('parent_path');
    let recordid_form = document.getElementById('record_id');

    //学習日入力欄に今日の日付を初期入力
    let today = new Date();
    studyday_form.value = today.getFullYear() +"-"+ (today.getMonth()+1) +"-"+ today.getDate();

    //未入力チェックをしてから登録ボタンにajaxを設定
    let submitBtn = document.getElementById('submit_btn');
    submitBtn.onclick = function(){
        if((achievement_form.value==-1)||(studytype_form.value==-1)){
            alert('達成度か学習タイプが未入力です。');
        }else{
            let confirm = window.confirm('登録します');
            if(confirm){
                let request = new XMLHttpRequest();
                request.open('POST', './php/input_record_area/input_record_area.php');
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.onreadystatechange = function(){
                    if(request.readyState == 4&&request.status == 200){
                        //データ登録が成功したら、レコードリストを更新
                        let recordListAchievement = document.getElementById('record_list_achievement');
                        recordListAchievement.onchange();
                        //フォルダ操作エリアも更新
                        let nextViewBtn = document.getElementById('next_view_btn');
                        nextViewBtn.click();
                        //フォルダ操作エリアに移動
                        let editarea = document.getElementById('edit_area');
                        let folderarea = document.getElementById('folder_block');
                        editarea.style.display = 'none';
                        folderarea.style.display = 'flex';
                    }
                }
                //入力フォームのデータを送信
                let params = 'studyday='+studyday_form.value;
                params += '&achievement='+achievement_form.value;
                params += '&studytype='+studytype_form.value;
                params += '&studytime='+(Number.parseInt(studytime_h_form.value,10)*3600 + Number.parseInt(studytime_m_form.value,10)*60 + Number.parseInt(studytime_s_form.value,10));
                params += '&addstudytime='+(Number.parseInt(add_studytime_h_form.value,10)*3600 + Number.parseInt(add_studytime_m_form.value,10)*60 + Number.parseInt(add_studytime_s_form.value,10));
                params += '&title='+title_form.value;
                params += '&memo='+memo_form.value;
                params += '&parentpath='+parentpath_form.value;
                params += '&id='+recordid_form.value;
                request.send(params);
            }
        }
    }

    //フォルダ操作エリアに戻る
    let returnBtn = document.getElementById('edit_return');
    returnBtn.onclick = function(){
        let confirm = window.confirm('編集を破棄して戻ります');
        if(confirm){
            let editarea = document.getElementById('edit_area');
            let folderarea = document.getElementById('folder_block');
            editarea.style.display = 'none';
            folderarea.style.display = 'flex';
        }
    }
});