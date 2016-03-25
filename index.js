var config = require('./config');
var TelegramBot = require('node-telegram-bot-api');
var wolfram = require('wolfram').createClient("U84L4V-YGA62TR3X8");

var token = config.token;
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

bot.onText(/([0-9]+)(\s+)?(.)(\s+)?([0-9]+)/, function (msg, match) {
  var fromId = msg.from.id;
  /*for (var index in match) {
    bot.sendMessage(fromId,index + " : " + match[index] + " " + typeof match[index]);
  };*/
  // console.log(msg);
  var number1 = parseFloat(match[1]);
  var number2 = parseFloat(match[5]);
  switch(match[3]) {
    case ("*"):
      var result = number1 * number2;
      break;
    case ("/"):
      var result = number1 / number2;
      break;
    case ("+"):
      var result = number1 + number2;
      break;
    case ("-"):
      var result = number1 - number2;
      break;
  }
    bot.sendMessage(fromId,"Your result is: " + result);
});

var wolfResult = [];
var wolfQueryText = [];

bot.onText(/\/wolf (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  wolfQueryText = match[1];
  console.log(wolfQueryText);
  wolfram.query(wolfQueryText, function(err, result) {
  if(err) throw err
  wolfResult = result;
  console.log("Result: %j", result)
  var obj = JSON.parse(result);
  console.log(obj);
  // bot.sendMessage(fromId, wolfResult);
  });
});
