document.addEventListener('DOMContentLoaded', function(){
    //移動ボタンにイベントを設定
    //フォルダパスを読み取って移動ボタンをonclickさせる
    //↑このイベントをフォルダ操作エリアの中心イベントにする
    let nextViewBtn = document.getElementById('next_view_btn');
    nextViewBtn.onclick = function(){
        //フォルダパスの読み取り
        let parentpath_view = document.getElementById('parentpath_view');
        let path = parentpath_view.value;

        //子フォルダエリアを更新
        let request_folder = new XMLHttpRequest();
        request_folder.open('POST', './php/folder_area/folder_children_area.php');
        request_folder.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request_folder.onreadystatechange = function(){
            if(request_folder.readyState == 4&&request_folder.status == 200){
                let targetarea = document.getElementById('folder_selector');
                targetarea.innerHTML = request_folder.responseText;

                //子フォルダをクリックした時に子フォルダに移動する
                let folders = document.getElementsByClassName('folders');
                for(let folder of folders){
                    folder.onclick = function(){
                        parentpath_view.value = this.firstChild.value;
                        nextViewBtn.click();
                    }
                }

                //フォルダ削除ボタンをクリックしたときのイベント
                let folder_delete_btns = document.getElementsByClassName('folder_delete_btn');
                for(let folder_delete_btn of folder_delete_btns){
                    folder_delete_btn.onclick = function(e){
                        e.stopPropagation();
                        let delete_confirm = window.confirm('フォルダを削除します\nフォルダに所属する全てのレコードが削除されます');
                        if(delete_confirm){
                            let folder_path = this.parentElement.parentElement.firstChild.value;
                            //子フォルダパスからフォルダIDを取得
                            let pattern = /^.*\/([0-9]+)\/$/;
                            let result = pattern.exec(folder_path);
                            let folder_id = result[1];
                            //フォルダ削除実行
                            let request_delete_folder = new XMLHttpRequest();
                            request_delete_folder.open('POST', './php/folder_area/delete_folder.php');
                            request_delete_folder.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            request_delete_folder.onreadystatechange = function(){
                                if(request_delete_folder.readyState == 4&&request_delete_folder.status == 200){
                                    nextViewBtn.click();
                                    let recordListAchievement = document.getElementById('record_list_achievement');
                                    recordListAchievement.onchange();
                                }
                            }
                            request_delete_folder.send('path='+folder_path+'&id='+folder_id);
                        }
                    }
                }
            }
        }
        request_folder.send('path='+path);

        //子レコードエリアを更新
        let request_record = new XMLHttpRequest();
        request_record.open('POST', './php/folder_area/record_children_area.php');
        request_record.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request_record.onreadystatechange = function(){
            if(request_record.readyState == 4&&request_record.status == 200){
                let targetarea = document.getElementById('record_selector');
                targetarea.innerHTML = request_record.responseText;

                //子レコードをクリックしたときのイベント
                let records = document.getElementsByClassName('records');
                for(let record of records){
                    record.onclick = function(){
                        //子レコードの情報を取得
                        let request_record_info = new XMLHttpRequest();
                        request_record_info.open('POST', './php/folder_area/record_info.php');
                        request_record_info.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        request_record_info.onreadystatechange = function(){
                            if(request_record_info.readyState == 4&&request_record_info.status == 200){
                                let record = eval('(' + request_record_info.responseText + ')');
                                editor_input(record.studyday, record.input_achievement, record.studytype, record.studytime_h, record.studytime_m, record.studytime_s, record.add_studytime_h, record.add_studytime_m, record.add_studytime_s, record.title, record.memo_area, record.record_id);
                            }
                        }
                        request_record_info.send('id='+this.firstChild.value);
                        //フォルダ名の設定
                        set_foldername();
                        //編集エリアに移動
                        let folderarea = document.getElementById('folder_block');
                        let editarea = document.getElementById('edit_area');
                        folderarea.style.display = 'none';
                        editarea.style.display = 'flex';
                    }
                }

                //レコード削除ボタンをクリックしたときのイベント
                let record_delete_btns = document.getElementsByClassName('record_delete_btn');
                for(let record_delete_btn of record_delete_btns){
                    record_delete_btn.onclick = function(e){
                        e.stopPropagation();
                        let delete_confirm = window.confirm('レコードを削除します');
                        if(delete_confirm){
                            let request_delete_record = new XMLHttpRequest();
                            request_delete_record.open('POST', './php/folder_area/delete_record.php');
                            request_delete_record.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            request_delete_record.onreadystatechange = function(){
                                if(request_delete_record.readyState == 4&&request_delete_record.status == 200){
                                    nextViewBtn.click();
                                    let recordListAchievement = document.getElementById('record_list_achievement');
                                    recordListAchievement.onchange();
                                }
                            }
                            request_delete_record.send('id='+this.parentElement.parentElement.firstChild.value);
                        }
                    }
                }
            }
        }
        request_record.send('path='+path);

        //フォルダ名を更新
        let request_foldername = new XMLHttpRequest();
        request_foldername.open('POST', './php/folder_area/get_folder_name.php');
        request_foldername.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request_foldername.onreadystatechange = function(){
            if(request_foldername.readyState == 4&&request_foldername.status == 200){
                let targetarea = document.getElementById('folder_name');
                targetarea.value = request_foldername.responseText;
            }
        }
        request_foldername.send('path='+path);

        //レコード累計学習時間を更新
        let request_totaltime = new XMLHttpRequest();
        request_totaltime.open('POST', './php/folder_area/get_totaltime.php');
        request_totaltime.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request_totaltime.onreadystatechange = function(){
            if(request_totaltime.readyState == 4&&request_totaltime.status == 200){
                let targetarea = document.getElementById('totaltime_area');
                targetarea.innerHTML = request_totaltime.responseText;
            }
        }
        request_totaltime.send('path='+path);

        //子レコード達成度を更新
        let request_achievement = new XMLHttpRequest();
        request_achievement.open('POST', './php/folder_area/get_achievement.php');
        request_achievement.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request_achievement.onreadystatechange = function(){
            if(request_achievement.readyState == 4&&request_achievement.status == 200){
                let targetarea = document.getElementById('achievement_area');
                targetarea.innerHTML = request_achievement.responseText;
            }
        }
        request_achievement.send('path='+path);

        //レコード編集エリアの親フォルダパスを変更
        let parent_path_area = document.getElementById('parent_path');
        parent_path_area.value = path;

        //フォルダグラフエリアを更新
        let request_foldergraphData = new XMLHttpRequest();
        request_foldergraphData.open('POST', './php/folder_area/get_folder_graph_data.php');
        request_foldergraphData.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request_foldergraphData.onreadystatechange = function(){
            if(request_foldergraphData.readyState == 4&&request_foldergraphData.status == 200){
                let new_data = eval('(' + request_foldergraphData.responseText + ')');
                folder_chart.data = new_data;
                folder_chart.update();
            }
        }
        request_foldergraphData.send('path='+path);

        //レコードグラフエリアを更新
        let request_graphData = new XMLHttpRequest();
        request_graphData.open('POST', './php/folder_area/get_graph_data.php');
        request_graphData.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request_graphData.onreadystatechange = function(){
            if(request_graphData.readyState == 4&&request_graphData.status == 200){
                let new_data = eval('(' + request_graphData.responseText + ')');
                record_chart.data = new_data;
                record_chart.update();
            }
        }
        request_graphData.send('path='+path);

        //上位フォルダ名をリストボックスに設定
        let request_ancestorFolders = new XMLHttpRequest();
        request_ancestorFolders.open('POST', './php/folder_area/get_ancestorfolders.php');
        request_ancestorFolders.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request_ancestorFolders.onreadystatechange = function(){
            if(request_ancestorFolders.readyState == 4&&request_ancestorFolders.status == 200){
                let ancestorFolders = document.getElementById('ancestor_folders');
                ancestorFolders.innerHTML = request_ancestorFolders.responseText;
                //編集エリアに上位フォルダ名を転記
                let edit = document.getElementById('parentfoldername');
                edit.innerText = ancestorFolders.firstChild.innerHTML;
            }
        }
        request_ancestorFolders.send('path='+path);

    }

    //グラフエリアを初回作成
    let ctx_folder = document.getElementById('folderChart');
    let folder_chart = new Chart(ctx_folder, {
        type: 'pie',
        data: {},
        options: {}
    });

    let ctx_record = document.getElementById('recordChart');
    let record_chart = new Chart(ctx_record, {
        data: {},
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'YYYY/MM/DD'
                        }
                    }
                },
                achievement: {
                    type:'linear',
                    position: 'left',
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        suggestedMax: 5
                    }
                },
                studytime: {
                    type:'linear',
                    position: 'right',
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });

    //グラフエリアの切り替え
    let graph_select = document.getElementById('graph_slect');
    graph_select.onchange = function(){
        let foldergraph = document.getElementById('folderChart');
        let recordgraph = document.getElementById('recordChart');
        if(this.value == 0){
            foldergraph.style.display = 'none';
            recordgraph.style.display = 'block';
        }else if(this.value == 1){
            recordgraph.style.display = 'none';
            foldergraph.style.display = 'block';
        }
    }
    graph_select.onchange();


    //新しいフォルダの追加
    let folderAddBtn = document.getElementById('add_folder');
    folderAddBtn.onclick = function(){
        //作成するフォルダ名の入力画面
        let name_prompt = prompt('作成するファイル名を指定してください','(New Folder)');
        if(name_prompt){
            //親フォルダパスの読み取り
            let parentpath = document.getElementById('parentpath_view');
            let path = parentpath.value;
            //ajaxを設定
            let request = new XMLHttpRequest();
            request.open('POST', './php/folder_area/add_folder.php');
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.onreadystatechange = function(){
                if(request.readyState == 4&&request.status == 200){
                    //フォルダの追加が完了したらフォルダ操作エリアを更新
                    let nextViewBtn = document.getElementById('next_view_btn');
                    nextViewBtn.click();
                }
            }
            request.send('path='+path+'&name='+name_prompt);
        }
    }

    //編集エリア入力
    function editor_input(studyday, input_achievement, studytype, studytime_h, studytime_m, studytime_s, add_studytime_h, add_studytime_m, add_studytime_s, title, memo_area, record_id){
        document.getElementById('studyday').value = studyday;
        document.getElementById('input_achievement').value = input_achievement;
        document.getElementById('studytype').value = studytype;
        document.getElementById('studytime_h').value = studytime_h;
        document.getElementById('studytime_m').value = studytime_m;
        document.getElementById('studytime_s').value = studytime_s;
        document.getElementById('add_studytime_h').value = add_studytime_h;
        document.getElementById('add_studytime_m').value = add_studytime_m;
        document.getElementById('add_studytime_s').value = add_studytime_s;
        document.getElementById('title').value = title;
        document.getElementById('memo_area').value = memo_area;
        document.getElementById('record_id').value = record_id;
    }

    //新規学習レコードの追加
    let recordAddBtn = document.getElementById('new_record');
    recordAddBtn.onclick = function(){
        //フォルダ名の設定
        set_foldername();
        //編集エリアのクリア
        let today = new Date();
        let today_value = today.getFullYear() +"-"+ ('00' + (today.getMonth()+1)).slice(-2) +"-"+ ('00' + today.getDate()).slice(-2);
        editor_input(today_value, -1, -1, 0, 0, 0, 0, 0, 0, '', '', -1);
        //編集エリアに移動
        let folderarea = document.getElementById('folder_block');
        let editarea = document.getElementById('edit_area');
        folderarea.style.display = 'none';
        editarea.style.display = 'flex';
    }

    //HOMEボタン
    let homeBtn = document.getElementById('homebtn');
    homeBtn.onclick = function(){
        //親フォルダパスをルートに設定
        let parentpath = document.getElementById('parentpath_view');
        parentpath.value = '/';
        //移動ボタンをonclick
        let nextViewBtn = document.getElementById('next_view_btn');
        nextViewBtn.click();
    }

    //戻るボタン
    let returnBtn = document.getElementById('returnbtn');
    returnBtn.onclick = function(){
        //現在の親フォルダパスを読込
        let path = document.getElementById('parentpath_view');
        //一つ上のフォルダパスに修正
        if(path.value != '/'){
            let pattern = /^(.*\/)[0-9]+\/$/;
            let result = pattern.exec(path.value);
            path.value = result[1];
        }
        //移動ボタンをonclick
        let nextViewBtn = document.getElementById('next_view_btn');
        nextViewBtn.click();
    }

    //上位フォルダリスト選択時に移動
    let ancestor_folders = document.getElementById('ancestor_folders');
    ancestor_folders.onchange = function(){
        //親フォルダパスをルートに設定
        let parentpath = document.getElementById('parentpath_view');
        parentpath.value = this.value;
        //移動ボタンをonclick
        let nextViewBtn = document.getElementById('next_view_btn');
        nextViewBtn.click();
    }

    //フォルダ名変更ボタン
    let changeNameBtn = document.getElementById('changenamebtn');
    changeNameBtn.onclick = function(){
        //ルートディレクトリ(/)の時は動かさない
        let path = document.getElementById('parentpath_view');
        if(path.value != '/'){
            let changename_confirm = window.confirm('フォルダ名を変更します');
            if(changename_confirm){
                //入力ファイル名を読込
                let name = document.getElementById('folder_name').value;
                //フォルダパスを読込
                let path = document.getElementById('parentpath_view').value;
                //フォルダIDを抽出
                let pattern = /^.*\/([0-9]+)\/$/;
                let result = pattern.exec(path);
                let id = result[1];
                //ajaxを設定
                let request = new XMLHttpRequest();
                request.open('POST', './php/folder_area/change_foldername.php');
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.onreadystatechange = function(){
                    if(request.readyState == 4&&request.status == 200){
                        let nextViewBtn = document.getElementById('next_view_btn');
                        nextViewBtn.click();
                    }
                }
                request.send('id='+id+'&name='+name);
            }
        }
    }

    //レコードリストに移動
    let gorecordlsitbtn = document.getElementById('go_recordlist');
    gorecordlsitbtn.onclick = function(){
        let folderarea = document.getElementById('folder_block');
        let listarea = document.getElementById('record_list_area');
        let gofolderareabtn = document.getElementById('go_folder');
        gofolderareabtn.style.display = 'inline';
        folderarea.style.display = 'none';
        listarea.style.display = 'flex';
    }

    //編集エリアにフォルダ名を転記
    function set_foldername(){
        let foldernamearea = document.getElementById('folder_name');
        let edit = document.getElementById('foldername');
        edit.innerText = foldernamearea.value;
    }

    //初回表示のために移動ボタンのonclickを発生させる
    nextViewBtn.click();
});