import alfy from 'alfy';
//https://taoken.slack.com/archives/CQ7CFT32L

// 環境変数の取得
const api = "xoxp-825280440711-825633548534-3320546032295-b2e1d33758dc35976c6527f2243366ef"
const token = process.env.TOKEN || api
const channel = process.env.CHANNEL || "CQ7CFT32L";//Slackデスクトップアプリ版の投稿したいチャンネルを右クリックし、「リンクをコピー」することでチャンネルIDは取得できます。https://xxxx.slack.com/archives/{チャンネルID}
const word = process.env.WORD || "reminder";
const mytext = process.argv[2];
const name = process.env.URL || "from Taoka ";

const now = new Date()
// 当日0時をターゲット日時に設定(ミリ秒)
const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);//100件以降はキャッチしない
//const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 23, 0);//new Date(year, month[, day, hour, minutes, seconds, milliseconds]);


// Unix時間(秒単位)に変換
const targetUnixTimestanp = Math.floor(targetDate.getTime() / 1000)

// oldestパラメータ:メッセージ履歴の取得開始時期を指定
const getHistoryUrl = `https://slack.com/api/conversations.history?channel=${channel}&oldest=${targetUnixTimestanp}`;
const postUrl = "https://slack.com/api/chat.postMessage";
var tsList=[];

(async() => {
    try {
        // 該当チャンネル内のその日に投稿されるメッセージ履歴を取得する(api: conversations.history)
        const response = await alfy.fetch(
            getHistoryUrl,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        )
        //console.log(response)
	    // 取得したメッセージのうち、文言の一致を条件に日報報告用のメッセージと判定する
        for(let i=0; i<response.messages.length; i++) {
            //console.log(word)
            if (response.messages[i].text==word){
                tsList.push(response.messages[i].ts)
            }
        }
        //console.log(tsList[tsList.length-1])
        await alfy.fetch(
            postUrl,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                json: {
                    channel: channel,
                    thread_ts: tsList[0],
                    text: `日報です${name}`+"\n"+mytext
                }
            }
        )
        var reaction_emojis = [
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
            "parrot", 
            "pleading_face", 
            "turkey", 
            "cook", 
            "woman_in_lotus_position", 
            "merperson", 
            "peanuts", 
            "broccoli"
        ];
        for(let i=0; i<reaction_emojis.length; i++) {
            var myurl = `https://slack.com/api/reactions.add?channel=${channel}&timestamp=${tsList[0]}&name=${reaction_emojis[i]}`;
            await alfy.fetch(
                myurl,{
                    method: "POST",
                    headers:  {
                        Authorization : `Bearer ${token}`
                    }
                }
            )
        }
        //console.log("targetUnixTimestanp is ...",targetUnixTimestanp)
        //console.log("timestamp is ...", tsList[0])
        const getRepliesHistoryUrl = `https://slack.com/api/conversations.replies?channel=${channel}&ts=${tsList[0]}`;
        const response2 = await alfy.fetch(
            getRepliesHistoryUrl,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        )
        //console.log(response2)
        const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await _sleep(100);
        var myts = response2.messages[response2.messages.length - 1].ts

        //curl -X POST 'https://slack.com/api/reactions.add?channel=CQ7CFT32L&timestamp=1649923359.643999&name=grin' -H 'Authorization: Bearer xoxp-825280440711-825633548534-3333594547058-e6227ce6dd9860cc28a7fb5a35c42bcc' | jq .
        for(let i=0; i<reaction_emojis.length; i++) {
            var myurl2 = `https://slack.com/api/reactions.add?channel=${channel}&timestamp=${myts}&name=${reaction_emojis[i]}`;
            //console.log("myurl2 is ...",myurl2)
            await alfy.fetch(
                myurl2,{
                    method: "POST",
                    headers:  {
                        Authorization : `Bearer ${token}`
                    }
                }
            )
        }
        console.log("%sを#apiに投稿成功!!!",`日報です${name}`+mytext)
    }
    catch {
        console.log("投稿失敗しました.....")
    }

})();


