import alfy from 'alfy';
//https://taoken.slack.com/archives/CQ7CFT32L

// 環境変数の取得
const api = "xoxp-825280440711-825633548534-3320546032295-b2e1d33758dc35976c6527f2243366ef"
const token = process.env.TOKEN || api
//const channel = process.env.CHANNEL || "CQ7CFT32L";//Slackデスクトップアプリ版の投稿したいチャンネルを右クリックし、「リンクをコピー」することでチャンネルIDは取得できます。https://xxxx.slack.com/archives/{チャンネルID}

//alfy.input は process.argv[2]と同じ
const mytext = alfy.input.substring(0,alfy.input.indexOf('%'));
const channel = alfy.input.substring(alfy.input.indexOf('%')+1,alfy.input.indexOf('$'));
const channelName = alfy.input.substring(alfy.input.indexOf('$')+1,alfy.input.indexOf('&'));
const timeStamp = Number(alfy.input.substring(alfy.input.indexOf('&')+1,));

// console.log("aaa",mytext)
// console.log("aaa",channel)
// console.log("aaa",channelName)
// const mytext = "ssss";
// const channel = "CQ7CFT32L"
// const channelName = "あああ"

const postUrl = "https://api.slack.com/methods/chat.scheduleMessage";
var tsList=[];

//curl -POST 'https://slack.com/api/chat.scheduleMessage' -H 'Authorization: Bearer xoxp-825280440711-825633548534-3333594547058-e6227ce6dd9860cc28a7fb5a35c42bcc' -H 'Content-Type: application/json; charset=utf-8' --data-binary '{"channel":"CQ7CFT32L","post_at":1652551891,"text":"Hello World"}' | jq . //これ行ける
//curl -POST 'https://slack.com/api/chat.scheduleMessage' -H 'Authorization: Bearer xoxp-825280440711-825633548534-3333594547058-e6227ce6dd9860cc28a7fb5a35c42bcc' --data-binary '{"channel":"CQ7CFT32L","post_at":1652551891,"text":"Hello World"}' | jq . //これ行けない
//curl -POST 'https://slack.com/api/chat.scheduleMessage' -H 'Authorization: Bearer xoxp-825280440711-825633548534-3333594547058-e6227ce6dd9860cc28a7fb5a35c42bcc' -H 'Content-Type: application/json; charset=utf-8' '{"channel":"CQ7CFT32L","post_at":1652551891,"text":"Hello World"}' | jq . //これ行けない
//curl -POST 'https://slack.com/api/chat.scheduleMessage?channel=CQ7CFT32L&post_at=1652551891&text=taoka' -H 'Authorization: Bearer xoxp-825280440711-825633548534-3333594547058-e6227ce6dd9860cc28a7fb5a35c42bcc' -H 'Content-Type: application/json; charset=utf-8' | jq . 
(async() => {
    try {
        const now0 = new Date()
        const targetDate0 = new Date(now0.getFullYear(), now0.getMonth(), now0.getDate(), now0.getHours(), now0.getMinutes(), now0.getSeconds());//100件以降はキャッチしない// 当日0時をターゲット日時に設定(ミリ秒)
        //const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 23, 0);//new Date(year, month[, day, hour, minutes, seconds, milliseconds]);
        const targetUnixTimestanp0 = Math.floor(targetDate0.getTime() / 1000)+timeStamp
        //console.log(`'https://slack.com/api/chat.scheduleMessage' -H 'Authorization: Bearer ${api}' -H 'Content-Type: application/json; charset=utf-8' --data-binary '{\"channel\":${channel},\"post_at\":${targetUnixTimestanp0},\"text\":${mytext}}'`)
        //console.log(`'https://slack.com/api/chat.scheduleMessage' -H 'Authorization: Bearer xoxp-825280440711-825633548534-3333594547058-e6227ce6dd9860cc28a7fb5a35c42bcc' -H 'Content-Type: application/json; charset=utf-8' --data-binary '{\"channel\":${channel},\"post_at\":${targetUnixTimestanp0},\"text\":${mytext}}'`)
        var obj = {"channel":channel,"post_at":targetUnixTimestanp0,"text":mytext}
        console.log(obj)
    }
    catch {
        console.log("投稿失敗しました.......")
    }
})();