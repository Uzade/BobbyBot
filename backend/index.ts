import { Request, Response } from 'express';
import cors from 'cors'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { token, UID } from './config.json'
import { login } from './ScottyManager/login';

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

app.get('/sendMessage', function (req: Request, res: Response) {
    if(!req.query.amount || !req.query.name){
        console.log('[LOG]: False input: ',req.query.amount, req.query.name)
        res.status(400).end('Invalid params!\nMake sure to add amount and name to the request')
        return
    }
    client.users.fetch(UID).then((user) => {
        user.send(`Gib Bobby jetzt ${req.query.amount} Leckerlie(s) ! Sofort! \nDas ist ein Auftrag von ${req.query.name}`)
       })
   res.end('message send')
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
