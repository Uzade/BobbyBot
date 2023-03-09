import cors from 'cors'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { token } from './config.json'
import { login } from './ScottyManager/login';
import { register } from './ScottyManager/register';
import sendMessage from './ScottyManager/sendMessage';
import { logout } from './ScottyManager/logout';
import schedule from 'node-schedule';
import { keyReset } from './ScottyManager/apiKeyReset';
import { getOpferData } from './ScottyManager/getOpferData';
import { sessionKeyCheck } from './ScottyManager/SessionKeyCheck';
import { Database } from "sqlite3";
import { kontoLevelUp } from './ScottyManager/kontoLevelUp';
import https from "https";
import fs from "fs";

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

var express = require('express');
var app = express();

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.login(token)

app.use(cors({
    origin:"*",
}))

app.use(express.static('static'))

app.use(express.json())

const db = new Database("./BobbyBank/Karottenspeicher.db")

sessionKeyCheck(db, app)
getOpferData(db, app)
login(db, app)
register(db, app)
sendMessage(db, app, client)
logout(db, app)

schedule.scheduleJob({hour: 2, minute: 13}, () => {
    console.log('All Users have been logged out successfully!');
    keyReset(db);
    kontoLevelUp(db);
  });

https.createServer({
  key: fs.readFileSync("https/privateKey.key"),
  cert: fs.readFileSync("https/certificate.cer")
}, app)

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
