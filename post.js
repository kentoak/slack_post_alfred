import alfy from 'alfy';
//https://taoken.slack.com/archives/CQ7CFT32L

// 環境変数の取得
const api = "xoxp-825280440711-825633548534-3320546032295-b2e1d33758dc35976c6527f2243366ef"
const token = process.env.TOKEN || api
const channel = process.env.CHANNEL || "CQ7CFT32L";//Slackデスクトップアプリ版の投稿したいチャンネルを右クリックし、「リンクをコピー」することでチャンネルIDは取得できます。https://xxxx.slack.com/archives/{チャンネルID}
const mytext = process.argv[2];

const postUrl = "https://slack.com/api/chat.postMessage";
var tsList=[];

(async() => {
    try {
        await alfy.fetch(
            postUrl,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                json: {
                    channel: channel,
                    text: mytext
                }
            }
        )
        console.log("%sを#apiに投稿成功!!!",mytext)
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
        const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await _sleep(1000);
        const now = new Date()
        const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);//100件以降はキャッチしない// 当日0時をターゲット日時に設定(ミリ秒)
        //const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 23, 0);//new Date(year, month[, day, hour, minutes, seconds, milliseconds]);
        const targetUnixTimestanp = Math.floor(targetDate.getTime() / 1000)// Unix時間(秒単位)に変換

        const getHistoryUrl = `https://slack.com/api/conversations.history?channel=${channel}&oldest=${targetUnixTimestanp}`;
        const response = await alfy.fetch(
            getHistoryUrl,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        )
        for(let i=0; i<response.messages.length; i++) {
            if (response.messages[i].text==mytext){
                tsList.push(response.messages[i].ts)
            }
        }
        //console.log(tsList)
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
    }
    catch {
        console.log("投稿失敗しました!!!!")
    }

})();