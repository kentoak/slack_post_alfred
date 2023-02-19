import alfy from 'alfy';
var emojis = [
    "thinking_face",
    "thumbsup",
    "gorilla",
    "grin",
    "kissing_smiling_eyes",
    "sweat_smile",
    "blue_heart",
    "point_right",
    "princess",
    "microbe", 
    "neutral_face", 
    "pleading_face", 
    "turkey", 
    "cook", 
    "woman_in_lotus_position", 
    "merperson", 
    "scream", 
    "kiss",
    "sunglasses",
    "flushed",
    "two_men_holding_hands",
    "dancer",
    "punch",
    "dizzy_face",
    "innocent"
];

var icon_emoji = ':'+emojis[Math.floor(Math.random()*emojis.length+1)]+':'//なぜかできない
//console.log((':'+emojis[0]+':' == ":thinking_face:"))
var config = {
  slack: {
    token: 'xoxb-825280440711-3775710145413-84LqrPerJSpwWKOeLhL5Ia9P',
    iconEmoji: emojis[Math.floor(Math.random()*emojis.length+1)],
  },
  channel: 'CQ7CFT32L',
};

var input = process.argv[2];
var name = input.split(" ")[0];
var text = input.split(" ")[1];
if (input.split(" ")[2]==1){
    text = fujiwarify(text);
}

// console.log("name is ",name)
// console.log("text is ",text)
// console.log(config.slack.token)
// console.log(config.channel)
// console.log(config.slack.iconEmoji)

var url = 'https://slack.com/api/chat.postMessage';
var payload = {
    channel: config.channel,
    text: text,
    username: makeHandle(name),
    // attachments: [{
    //     text: '```' + text + '```',
    //     color: "good",
    //     mrkdwn_in: 'text'
    // }],
    icon_emoji: config.slack.iconEmoji
};

(async() => {
    try {
        await alfy.fetch(
            url,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${config.slack.token}`
                },
                json: payload
            }
        )
        if (text.length > 0){
          console.log("投稿成功！")
        }
    } catch {
        console.log("投稿失敗しました!!!!")
    }
})();


function stringToArray (str) {
  // from https://qiita.com/YusukeHirao/items/2f0fb8d5bbb981101be0
  return str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
}

function fujiwarify(s) {
  s = s.replace(/(ください|下さい|ます|です|たい|う|た|よ)([。！!]|$)/g, function (s, a, b) {
    if (a === 'よ') {
      return a + 'ぉぉぉぉ' + b;
    } else {
      return a + 'よぉぉぉぉ' + b;
    }
  });
  var chars = stringToArray(s);
  var result = '';
  chars.forEach(function (c) {
    result += c + '゛';
  });
  return result;
}

function makeHandle (nickname) {
  return nickname.replace(/◆/g, '◇')
    .replace(/(#[\x20-\x7e]{1,8})$/, function (s, a) {
      var salt = 'long long text here.'
      var sha1 = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1, salt + a);
      var sha1text = Utilities.base64Encode(sha1);
      //console.log('◆' + sha1text.substring(0,10))
      return '◆' + sha1text.substring(0,10);
    });
}


