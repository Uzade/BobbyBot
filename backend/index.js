const { Client, Events, GatewayIntentBits } = require('discord.js')
const { token, UID } = require('./config.json')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

var express = require('express');
var app = express();

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
})

client.login(token)

app.get('/sendMessage', function (req, res) {
    if(!req.query.amount || !req.query.name){
        console.log(req.query.amount, req.query.name)
        res.status(400).end('Invalid params!\nMake sure to add amount and name to the request')
        return
    }
    client.users.fetch(UID, false).then((user) => {
        user.send(`Gib Bobby jetzt ${req.query.amount} Karotten ! Sofort! \nDas ist ein Auftrag von ${req.query.name}`)
       })
   res.end('message send')
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
