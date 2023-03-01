
import { Client } from "discord.js";
import { Express } from "express";
import { UID } from '../config.json'

const sendMessage = (app: Express, dcClient: Client) => { 
    app.get('/sendMessage', (req, res)  => {
        if(!req.query.amount || !req.query.name){
            console.log('[LOG]: False input: ',req.query.amount, req.query.name)
            res.status(400).end('Invalid params!\nMake sure to add amount and name to the request')
            return
        }
        dcClient.users.fetch(UID).then((user) => {
            user.send(`Gib Bobby jetzt ${req.query.amount} Leckerlie(s) ! Sofort! \nDas ist ein Auftrag von ${req.query.name}`)
        })
    res.end('message send')
    })
}

export default sendMessage;