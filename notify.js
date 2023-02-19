

const mytext = process.argv[2].substring(0,process.argv[2].indexOf('%'));
const channel = process.argv[2].substring(process.argv[2].indexOf('%')+1,process.argv[2].indexOf('$'));
const channelName = process.argv[2].substring(process.argv[2].indexOf('$')+1,process.argv[2].indexOf('&'));
const timeStamp = Number(process.argv[2].substring(process.argv[2].indexOf('&')+1,));
const now0 = new Date()
const targetDate0 = new Date(now0.getFullYear(), now0.getMonth(), now0.getDate(), now0.getHours(), now0.getMinutes(), now0.getSeconds());//100件以降はキャッチしない// 当日0時をターゲット日時に設定(ミリ秒)
const targetUnixTimestanp0 = Math.floor(targetDate0.getTime() / 1000)+timeStamp
let date = new Date(targetUnixTimestanp0*1000)
// console.log("ts:",targetUnixTimestanp0*1000)
// console.log("Unix Timestamp:",targetUnixTimestanp0*1000)
// console.log("Date Timestamp:",date.getTime())
// console.log(date)
// console.log("Date: "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
// console.log(date.getDate())
// console.log(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())
var sec = String(date.getSeconds())
if (date.getSeconds()<10){
    sec = "0"+sec
}
var postDate = (date.getMonth()+1)+"/"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+sec
console.log("%sを#%sへ%sに投稿します",mytext,channelName,postDate)