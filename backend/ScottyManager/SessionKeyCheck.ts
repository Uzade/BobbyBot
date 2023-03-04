import { Express } from "express";
import { apiKeyCheck } from "./apiKeyCheck";

export const sessionKeyCheck= (app:Express)=>{

    app.post("/keyCheck", async (request,response)=>{
        if(await apiKeyCheck(request.body.UID,request.body.apiKey)){
            response.status(200).json({apiKey: true});
        }else{
            response.status(200).json({apiKey: false});
        }
    })
}