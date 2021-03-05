const Discord = require("discord.js")
const req = require('request')
const color = require("colors")
var title = require('console-title')
const {StopWatch} = require("stopwatch-node")
const fs = require("fs")
const ms = require("parse-ms")
const customer = new Discord.Client();

let basicmessage1 = (color.white("["));
let basicmessage2 = (color.white("]"));
let successlogo = (color.green("»"));
let failedlogo = (color.red("»"));
let infologo = (color.blue("»"));
let tielogo = (color.magenta("»"));
let fakelogo = (color.yellow("»"));
let fakevar = `${basicmessage1}${fakelogo}${basicmessage2}`;
let invalidlogo = `${basicmessage1}${failedlogo}${basicmessage2}`;
let usedlogo = `${basicmessage1}${tielogo}${basicmessage2}`;
let check = `${basicmessage1}${infologo}${basicmessage2}`;
let success = `${basicmessage1}${successlogo}${basicmessage2}`;

fs.readFile(__dirname + "/config.json",function(err, parse)
{
title(`SnipeKEK By Ev3res - V1.0 | Loading config.json`);
logo();
console.log(`${check}  Loading: Config.json`)
var bruh = JSON.parse(parse);
let usewebhook = bruh["usewebhook"];
let snipewithalt = bruh["claimwithalt"];
let webhooklink = bruh["webhooklink"];
let token = bruh["token"];
let alttoken = bruh["alttoken"];
let useblacklist = bruh["useblacklist"];
customer.login(token);
customer.on("ready", ()=>{
fs.readFile(__dirname + "/Blacklist.txt",function(err, data)
{
console.clear();
title(`SnipeKEK By Ev3res - V1.0 | Menu`);
logo();
LoadShits();
saysettings();
customer.on("message",async message=>
{  
if(message.author == customer.user) return;
if(message.content.includes("discord.gift"))
{
if(useblacklist == "true" && data.includes(message.author.id)) return;
var reg = /(discord\.(gift)).+[a-z|A-Z|0-9]/.exec(message.content);
if(!reg) return sayfake(message.author.tag);
var code = reg[0].split('/')[1];
genitro(code);
};
if(message.content.includes("discordapp.com/gifts/"))
{   
if(useblacklist == "true" && data.includes(message.author.id)) return; 
var ff = /discordapp.com\/gifts\/.+[a-z|A-Z|0-9]/.exec(message.content);
if(!ff) return sayfake(message.author.tag);
var code = ff[0].split('/')[1];
genitro(code);
};

function genitro(code)
{
var tok = token
if(snipewithalt == "true") tok = alttoken;
const sw = new StopWatch("BRUHWTF");
sw.start('BRUHWTF');
req.post({
url: `https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`, 
headers: 
{
"authorization": tok,
}},function(err, res, body)
{
sw.stop()
let task = sw.getTask('BRUHWTF')
const getms = task?.timeMills
const time = ms(getms)
let type = "DMS"
if(message.guild) type = `A Server\n\n${check} Server Name: ${message.guild.name}\n\n${check} Channel Name: ${message.channel.name}`
if(JSON.parse(body)["message"] == "Unknown Gift Code") return sayinvalid(time.seconds, time.milliseconds, message.author.tag, type, code);
else if(JSON.parse(body)["message"] == "This gift has been redeemed already.") return sayused(time.seconds, time.milliseconds, message.author.tag, type, code);
else if(body.includes("subscription_plan")) return sayvalid(time.seconds, time.milliseconds, message.author.tag, type, code, JSON.parse(body).subscription_plan["name"])})}})})

function saysettings()
{
console.log(`${success} Ready`)
console.log(`\n${check}  Username: ${customer.user.tag}`)
console.log(`\n${check} Servers: ${customer.guilds.size}`)
Convert(usewebhook, "Use Webhook");
Convert(snipewithalt, "Claim With Alt");
Convert(useblacklist, "Use BlackList")
if(usewebhook == "true") console.log(`\n${check} Webhook URL: ${webhooklink}`)
};

function sayfake(author)
{
console.log(`\n${success} Sniped A Code \n\n${check} Sent By ${author} \n\n${fakevar} Status: Fake`);
};
function sayinvalid(sec, ms, author, type, code)
{
console.log(`\n${success} Sniped A Code ( ${sec}.${ms} Seconds )\n\n${check} Sent By ${author} In ${type}\n\n${invalidlogo} Status: Invalid\n\n${check} Code: ${code}`);
};
function sayused(sec, ms, author, type, code)
{
console.log(`\n${success} Sniped A Code ( ${sec}.${ms} Seconds )\n\n${check} Sent By ${author} In ${type}\n\n${usedlogo} Status: Used\n\n${check} Code: ${code}`);
};

function sayvalid(sec, ms, author, type, code, capture)
{
console.log(`\n${success} Sniped A Code ( ${sec}.${ms} Seconds )\n\n${check} Sent By ${author} In ${type}\n\n${success} Status: Valid\n\n${check} Code: ${code}\n\n${check} Nitro: ${capture}`);
if(usewebhook == "true")
{   
    let cont = `**Sniped A Code ( ${sec}.${ms} Seconds )\n\nIn ${type.replace(check, "").replace(usedlogo, "").replace(invalidlogo, "").replace(success, "")}\n\nStatus: Valid\n\nCode: ${code}\n\nNitro: ${capture}**`
    try{req.post({
        uri: webhooklink,
        method: "POST",
        json: {content: cont}
    })}
    catch{}};
};

function Convert(stfu, value)
{
var omg = false;
if(stfu != "false") omg = true;
if(omg) console.log(`\n${check} ${color.white(`${value}: `)} ${color.green("True")}`);
else console.log(`\n${check} ${color.white(`${value}: `)} ${color.red("False")}`);
};

function LoadShits()
{
    switch(usewebhook)
    {
    case "true":
    break;
    case "false":
    break;
    case undefined:
    console.log("Error - Config => usewebhook")
    return setTimeout(() => {
        
    }, 3600000);
    default:
    usewebhook = "false";
    break;
    };
    switch(snipewithalt)
    {
    case "true":
    break;
    case "false":
    break;
    case undefined:
    console.log("Error - Config => claimwithalt")
    return setTimeout(() => {
        
    }, 3600000);
    default:
    snipewithalt = "false";
    break;
    }
};
switch(useblacklist)
    {
    case "true":
    break;
    case "false":
    break;
    case undefined:
    console.log("Error - Config => useblacklist")
    return setTimeout(() => {
        
    }, 3600000);
    default:
    useblacklist = "false";
    break;
    };
});

function logo()
{
console.log("");
console.log("");
console.log(color.cyan("     ███████╗██╗   ██╗██████╗ ██████╗ ███████╗███████╗"));
console.log(color.cyan("     ██╔════╝██║   ██║╚════██╗██╔══██╗██╔════╝██╔════╝"));
console.log(color.cyan("     █████╗  ██║   ██║ █████╔╝██████╔╝█████╗  ███████╗"));
console.log(color.cyan("     ██╔══╝  ╚██╗ ██╔╝ ╚═══██╗██╔══██╗██╔══╝  ╚════██║"));
console.log(color.cyan("     ███████╗ ╚████╔╝ ██████╔╝██║  ██║███████╗███████║"));
console.log(color.cyan("     ╚══════╝  ╚═══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝"));
console.log("");}});