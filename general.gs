var SPREAD_SHEET_KEY = "";
function doPost(e) {
  var params = JSON.parse(e.postData.getDataAsString()); // Postデータのボディを取得
}

function DebugLog(arg){
  var spreadsheet = SpreadsheetApp.openById(SPREAD_SHEET_KEY);
  var debugSheet = spreadsheet.getSheetByName("デバッグ");
  var lastRow = debugSheet.getLastRow();
  debugSheet.getRange(lastRow+1, 1, 1, 1).setValues([[arg]]);
}
