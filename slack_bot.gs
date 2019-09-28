var SLACK_OUTGOING_WEBHOOK_TOKEN = ""; //設定
var SLACK_INBOUND_URL = "";//設定


//スラックのoutgoing_webhookからのリクエストを取得
function doPost(e) {
  var params = e.parameter
  if (SLACK_OUTGOING_WEBHOOK_TOKEN != params.token) {
    throw new Error("invalid token.");
  }
  //params一覧：以下の値が取得できる
  /*
    token
    team_id
    team_domain // ワークスペース名
    channel_id // メッセージを送信したチャンネルのID
    channel_name // メッセージを送信したチャンネル名
    timestamp // 送信時刻(UNIXタイム)
    user_id // 送信者ID
    user_name // 送信者のユーザーネーム
    text // メッセージ本文
    trigger_word //outgoing webhookのトリガーに設定しているワード
  */

  // 送信したチャンネルにそのまま返信
  return ContentService.createTextOutput("レスポンス").setMimeType(ContentService.MimeType.JSON);
}

//スラックにinbound_webhookを使って送信する場合
function sendToSlack() {
  var options = {
    "method" : "POST",
    "payload" : JSON.stringify({
      "text" : "スラックに送るメッセージ本文",
      "channel" : "#tryal",
      "username" : "リマインダーbot",
      "icon_emoji" : ":musical_note:",
      "attachments": [{
        color: "#89CEEB",
        pretext: "attachmentの説明文",
        author_icon: "アイコンURL",
        author_name: "authorリンクの名前(エイリアス)",
        author_link: "http://google.co.jp/",
        title: "記事リンクのタイトル(エイリアス)",
        title_link: "https://google.co.jp/",
        text: "記事に関する長めの説明を追加できる"
      }]
    })
  };
  UrlFetchApp.fetch(SLACK_INBOUND_URL, options);
}
