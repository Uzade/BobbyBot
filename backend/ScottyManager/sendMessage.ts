import { Client } from "discord.js";
import { Express } from "express";
import { UID } from '../config.json'
import { apiKeyCheck } from "./apiKeyCheck";

const sendMessage = (app: Express, dcClient: Client) => { 
    app.post('/sendMessage', async (req, res)  => {
        if(await apiKeyCheck(req.body.UID, req.body.apiKey)){
            if(!req.body.amount || !req.body.UID){
                console.log('[LOG]: False input: ',req.body.amount, req.body.UID)
                res.status(400).end('Invalid params!\nMake sure to add amount to the request')
                return
            }
            dcClient.users.fetch(UID).then((user) => {
                user.send(`Gib Bobby jetzt ${req.body.amount} Leckerlie(s) ! Sofort! \nDas ist ein Auftrag von ${req.body.UID}`)
            })
            res.end('message send'); 
        }else{
            res.status(401).json({Error: "ApiKey not matching! False command."});
        }
    })
}

export default sendMessage;