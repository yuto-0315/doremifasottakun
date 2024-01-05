// CSVファイルを読み込む関数
function readCSV() {
    // XMLHttpRequestを使用してCSVファイルを読み込む
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                displayCSV(xhr.responseText);
            } else {
                console.error('Failed to load CSV');
            }
        }
    };
    xhr.open('GET', 'data.csv', true); // data.csvには実際のCSVファイルのパスを指定
    xhr.send();
}

// 読み込んだCSVデータを表形式で表示する関数
function displayCSV(csvData) {
    var table = document.getElementById('csvTable');
    var rows = csvData.split('\n');

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].split(',');
        var row = table.insertRow(-1); // 新しい行を追加

        for (var j = 0; j < cells.length; j++) {
            var cell;
            if (i === 0) { // 1行目の場合
                cell = document.createElement('th'); // th要素を作成
            } else {
                cell = document.createElement('td'); // 通常のセルはtd要素を作成
            }

            if (j === 1 && i > 0) { // 2列目でかつ1行目以外の場合
                var link = document.createElement('a'); // a要素を作成
                link.href = cells[j]; // リンク先をセット
                link.textContent = cells[j - 1]; // テキストをセット
                cell.appendChild(link); // セルにリンクを追加
            } else {
                cell.textContent = cells[j]; // 通常のセルにCSVデータを挿入
            }

            row.appendChild(cell); // 行にセルを追加
        }
    }
}

// ページが読み込まれた時にCSVを読み込む
document.addEventListener('DOMContentLoaded', function() {
    readCSV();
});