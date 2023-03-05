import { Client } from "discord.js";
import { Express } from "express";
import { UID } from '../config.json'
import { apiKeyCheck } from "./apiKeyCheck";
import { Database } from "sqlite3";
import path from "path";

const sendMessage = (app: Express, dcClient: Client) => { 
    const db= new Database(path.resolve(__dirname,"../BobbyBank/Karottenspeicher.db"));
    app.post('/sendMessage', async (req, res)  => {
        if(await apiKeyCheck(req.body.UID, req.body.apiKey)){
            if(!req.body.amount || !req.body.UID){
                console.log('[LOG]: False input: ',req.body.amount, req.body.UID)
                res.status(400).end('Invalid params!\nMake sure to add amount to the request')
                return
            }
            db.get("SELECT opferKonto, opfergaben FROM anhaenger WHERE userName=\'"+req.body.UID+"\'",(_error,user)=>{                
                if(user.opferKonto>=req.body.amount){
                    dcClient.users.fetch(UID).then((user) => {
                        user.send(`Gib Bobby jetzt ${req.body.amount} Leckerlie(s) ! Sofort! \nDas ist ein Auftrag von ${req.body.UID} mit der folgenden Nachricht:\n ${req.body.message}`)
                    })
                    db.exec("UPDATE anhaenger SET opfergaben="+(user.opfergaben+req.body.amount)+", lastOpfer=CURRENT_TIMESTAMP, opferKonto="+(user.opferKonto-req.body.amount)+" WHERE username=\'"+req.body.UID+"\'");
                    res.end('message send');
                }else{
                    res.status(400).json({Error: "Not enough Opfer left!"});
                }
            })             
        }else{
            res.status(401).json({Error: "ApiKey not matching! False command."});
        }
    })
}

export default sendMessage;