import { Express } from "express";
import { apiKeyCheck } from "./apiKeyCheck";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const sessionKeyCheck= (db: PromissingSQLite3, app:Express)=>{

    app.post("/keyCheck", async (request,response)=>{
        if(await apiKeyCheck(db, request.body.UID,request.body.apiKey)){
            response.status(200).json({apiKey: true});
        }else{
            response.status(200).json({apiKey: false});
        }
    })
}