import cors from 'cors'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { token } from './config.json'
import { login } from './ScottyManager/login';
import { register } from './ScottyManager/register';
import sendMessage from './ScottyManager/sendMessage';
import { logout } from './ScottyManager/logout';

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

app.use(express.json())

login(app)
register(app)
sendMessage(app, client)
logout(app)


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
