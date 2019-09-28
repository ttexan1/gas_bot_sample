var SLACK_BOT_ACCESS_TOKEN = ""
var dialogURL = "https://slack.com/api/dialog.open";

function doPost(e) {  
  if (!e.parameter.payload){
    var payload = SelectAction()
    return ContentService.createTextOutput(payload).setMimeType(ContentService.MimeType.JSON);
  }
  
  var request = JSON.stringify(e).replace("=",":");
  e = JSON.parse(request)
  var payload = JSON.parse(e.parameter.payload); 
  var callback_id = payload.callback_id;
  var trigger_id = payload.trigger_id;
  var channel = payload.channel.name
  
  if (callback_id == "select_task"){
    var selectedTask = payload.actions[0].value;
    
    switch (selectedTask) {
      case "register_reminds":
        dialogRemind(trigger_id, channel);
        break;
      case "offer_money":
        dialogOfferMoney(trigger_id, channel)
        break;
      case "end":
        return ContentService.createTextOutput("End").setMimeType(ContentService.MimeType.JSON);
        break;
    }
    return ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON);
  }
  
  switch (callback_id) {
    case "submit_remind":
      registerRemind(payload);
      break;
    case "submit_offer_money":
      offerMoney(payload)
      break;
    case "end":
      break;
  }
  return ContentService.createTextOutput().setMimeType(ContentService.MimeType.JSON);
}



function SelectAction () {
  payload = {
    "response_type": "in_channel",
    "text": "Slack Helper",
    "attachments": [
      {
        "text": "Select the Action",
        "fallback": "Failed",
        "callback_id": "select_task",
        "color": "#3AA3E3",
        "actions": [
          {
            "name": "task",
            "text": "リマインダー",
            "type": "button",
            "value": "register_reminds"
          },
          {
            "name": "task",
            "text": "経費申請",
            "type": "button",
            "value": "offer_money"
          }
        ]
      }
    ]
  }
  return JSON.stringify(payload)
}



function dialogRemind(trigger_id, channel) {
  var title = "Register(" + channel + ")"
  var dialog = {
    "token": SLACK_BOT_ACCESS_TOKEN,//OAuth token
    "trigger_id": trigger_id,
    "dialog": JSON.stringify({
      "callback_id": "submit_remind",
      "title": title,
      "submit_label": "決定",
      "elements": [
        {
          "label": "リクエストを選択",
          "type": "select",
          "name": "request",
          "options": [
            {
              "label": "作成・更新",
              "value": "create_or_update"
            },
            {
              "label": "削除",
              "value": "delete"
            }
          ]
        },
        {
          "type": "textarea",
          "label": "日程を登録(複数登録可)",
          "placeholder": "例) 11/11 11:00 ~ @第一会議室",
          "name": "days"
        }
      ]
    })
  };
  var options = {
    'method' : 'post',
    'payload' : dialog,
  }; 
  var response = UrlFetchApp.fetch(dialogURL, options);
  return ContentService.createTextOutput(); // Necessary
}


function dialogOfferMoney(trigger_id, channel) {
  var title = "経費申請"
  var dialog = {
    "token": SLACK_BOT_ACCESS_TOKEN,//OAuth token
    "trigger_id": trigger_id,
    "dialog": JSON.stringify({
      "callback_id": "submit_offer_money",
      "title": title,
      "submit_label": "送信",
      "elements": [
        {
          "type": "text",
          "label": "氏名",
          "name": "name"
        },
        {
          "label": "申請経費区分",
          "type": "select",
          "name": "partition",
          "options": [
            {
              "label": "小道具",
              "value": "concert"
            },
            {
              "label": "一般",
              "value": "general"
            }
          ]
        },
        {
          "type": "textarea",
          "label": "申請項目名",
          "name": "item"
        },
        {
          "type": "text",
          "label": "金額",
          "subtype": "number",
          "name": "money"
        }
      ]
    })
  };
  var options = {
    'method' : 'post',
    'payload' : dialog,
  }; 
  var response = UrlFetchApp.fetch(dialogURL, options);
  return ContentService.createTextOutput();
}


function offerMoney(params){
  var sbm = params.submission
  var name = sbm.name
  ...
}

function registerRemind(params){
  var sbm = params.submission
  var request = params.submission.request;
  ...
}