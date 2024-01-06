// CSVファイルを読み込む関数
function readCSV(csvPath, tableId) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                displayCSV(xhr.responseText, tableId);
            } else {
                console.error('Failed to load CSV');
            }
        }
    };
    xhr.open('GET', csvPath, true);
    xhr.send();
}

// 読み込んだCSVデータを表形式で表示する関数
function displayCSV(csvData, tableId) {
    var table = document.getElementById(tableId);
    var rows = csvData.split('\n');

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].split(',');
        var row = table.insertRow(-1);

        for (var j = 0; j < cells.length; j++) {
            var cell;
            if (i === 0) {
                cell = document.createElement('th');
            } else {
                cell = document.createElement('td');
            }

            if (j === 1 && i > 0) {
                var link = document.createElement('a');
                link.href = cells[j];
                link.textContent = cells[j - 1];
                cell.appendChild(link);
            } else {
                cell.textContent = cells[j];
            }

            row.appendChild(cell);
        }
    }
}

// ページが読み込まれた時にCSVを読み込む
document.addEventListener('DOMContentLoaded', function() {

    readCSV("total.csv", "total_table");
    readCSV("office.csv", "office_table");
    readCSV("music.csv", "music_table");

});
