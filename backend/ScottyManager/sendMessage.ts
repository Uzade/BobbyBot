import { Client } from "discord.js";
import { Express } from "express";
import { UID } from '../config.json'
import { apiKeyCheck } from "./apiKeyCheck";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";

const sendMessage = (db: PromissingSQLite3, app: Express, dcClient: Client) => { 

    app.post('/sendMessage', async (req, res)  => {
        if(!await apiKeyCheck(db, req.body.UID, req.body.apiKey)){
            res.status(401).json({Error: "ApiKey not matching! False command."});
            return;
        }
        
        if(!req.body.amount || !req.body.UID){
            console.log('[LOG]: False input: ',req.body.amount, req.body.UID)
            res.status(400).end('Invalid params!\nMake sure to add amount to the request')
            return
        }
        const user = await db.getPrep("SELECT opferKonto, opfergaben FROM anhaenger WHERE userName=?", req.body.UID);
                   
        if(user.opferKonto<req.body.amount){
            res.status(400).json({Error: "Not enough Opfer left!"});
            return;
        }
        dcClient.users.fetch(UID).then((user) => {
            user.send(`Gib Bobby jetzt ${req.body.amount} Leckerlie(s) ! Sofort! \nDas ist ein Auftrag von ${req.body.UID} mit der folgenden Nachricht:\n ${req.body.message}`)
        })
        db.execPrepFile("ScottyManager/SQL/logSendMessage.sql",
            (user.opfergaben+req.body.amount),
            (user.opferKonto-req.body.amount),
            req.body.UID
        );
        res.end('message send');
    })
}

export default sendMessage;