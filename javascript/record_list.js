//ページ表示完了時に、レコードリストエリアにajaxを設定
document.addEventListener('DOMContentLoaded', function(){
    let recordListAchievement = document.getElementById('record_list_achievement');
    recordListAchievement.onchange = function(){
        let request = new XMLHttpRequest();
        request.open('POST', './php/record_list/record_list.php');
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.onreadystatechange = function(){
            if(request.readyState == 4&&request.status == 200){
                let targetarea = document.getElementById('record_list');
                targetarea.innerHTML = request.responseText;
                //レコードリストの表示が完了したら、それぞれにクリックイベントを設定
                let records = document.getElementsByClassName('record_list_group');
                for(let record of records){
                    record.onclick = function(){
                        //レコードに持たせたパスから、フォルダパスとレコードIDを取得
                        let pattern = /^(.*\/)([0-9]+)$/;
                        let result = pattern.exec(this.firstChild.value);
                        //フォルダ操作エリアの表示パスを変更
                        let path = document.getElementById('parentpath_view');
                        path.value = result[1];
                        //移動ボタンをonclick
                        let nextViewBtn = document.getElementById('next_view_btn');
                        nextViewBtn.click();
                    }
                }
            }
        }
        request.send('filter=' + this.value);
    }

    //フォルダエリアに移動
    let gofolderbtn = document.getElementById('go_folder');
    gofolderbtn.onclick = function(){
        let folderarea = document.getElementById('folder_block');
        let listarea = document.getElementById('record_list_area');
        listarea.style.display = 'none';
        folderarea.style.display = 'flex';
    }

    //初回表示のためにonchangeを発生させる
    recordListAchievement.onchange();
});