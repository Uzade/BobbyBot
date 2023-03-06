import { Express } from "express";
import { apiKeyCheck } from "./apiKeyCheck";
import { Database } from "sqlite3";

export const sessionKeyCheck= (db: Database, app:Express)=>{

    app.post("/keyCheck", async (request,response)=>{
        if(await apiKeyCheck(db, request.body.UID,request.body.apiKey)){
            response.status(200).json({apiKey: true});
        }else{
            response.status(200).json({apiKey: false});
        }
    })
}