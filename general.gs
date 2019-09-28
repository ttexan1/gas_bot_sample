var SPREAD_SHEET_KEY = "";

// 通常のPoostリクエストを処理
function doPost(e) {
   // Postデータのボディを取得
  var params = JSON.parse(e.postData.getDataAsString());
}

// HTMLページを表示
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

// スプレッドシートをログファイルがわりに使用
function DebugLog(arg){
  var spreadsheet = SpreadsheetApp.openById(SPREAD_SHEET_KEY);
  var debugSheet = spreadsheet.getSheetByName("デバッグ");
  var lastRow = debugSheet.getLastRow();
  debugSheet.getRange(lastRow+1, 1, 1, 1).setValues([[arg]]);
}
