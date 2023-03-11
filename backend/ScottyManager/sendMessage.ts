import { Client } from "discord.js";
import { Express } from "express";
import { UID } from '../config.json'
import { apiKeyCheck } from "./apiKeyCheck";
import { Database } from "sqlite3";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";

const sendMessage = (dbOld: Database, app: Express, dcClient: Client) => { 

    const db = new PromissingSQLite3(dbOld);

    app.post('/sendMessage', async (req, res)  => {
        if(!await apiKeyCheck(dbOld, req.body.UID, req.body.apiKey)){
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
        db.execPrep("UPDATE anhaenger SET opfergaben=?, lastOpfer=CURRENT_TIMESTAMP, opferKonto=? WHERE username=?",
            (user.opfergaben+req.body.amount),
            (user.opferKonto-req.body.amount),
            req.body.UID
        );
        res.end('message send');
    })
}

export default sendMessage;