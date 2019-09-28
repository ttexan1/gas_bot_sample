// LINE Developersから取得
var CHANNEL_ACCESS_TOKEN = '';

//doPost(e)で受け取りユーザーメッセーじにおうむ返しする
function doPost(e) {
  var event = JSON.parse(e.postData.contents).events[0];
  var replyToken= event.replyToken;
  if (typeof replyToken === 'undefined') {
    return; // エラー処理
  }
  if(event.type == 'message') {
    var sentMessage = event.message.text;
    var replyMessage = sentMessage;
    if(replyMessage) {    
      var url = 'https://api.line.me/v2/bot/message/reply';
      UrlFetchApp.fetch(url, {
        'headers': {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
        },
        'method': 'post',
        'payload': JSON.stringify({
          'replyToken': replyToken,
          'messages': [{ //配列で5件まで送信可能
            'type': 'text',
            'text': replyMessage,
          }],
        }),
      });
    }
    return ContentService.createTextOutput(
      JSON.stringify({'content': 'post ok'})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendPushNotification(message) {
  var groupId = ""; //友達登録の際などに取得し保存しておく
  var url = 'https://api.line.me/v2/bot/message/push';

  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'to': groupId,
      'messages': [{
        'type': 'text',
        'text': message,
      }],
    }),
  });
  return ContentService.createTextOutput(
    JSON.stringify({'content': 'post ok'})
  ).setMimeType(ContentService.MimeType.JSON);
}