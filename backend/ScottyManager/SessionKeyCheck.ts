import { Express } from "express";
import { apiKeyCheck } from "./apiKeyCheck";
import { Database } from "sqlite3";

export const sessionKeyCheck= (dbOld: Database, app:Express)=>{

    app.post("/keyCheck", async (request,response)=>{
        if(await apiKeyCheck(dbOld, request.body.UID,request.body.apiKey)){
            response.status(200).json({apiKey: true});
        }else{
            response.status(200).json({apiKey: false});
        }
    })
}