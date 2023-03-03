import { Express } from "express";
import { Database } from "sqlite3";
import path from "path";
import { apiKeyCheck } from "./apiKeyCheck";

export const logout= (app:Express)=>{

    const db= new Database(path.resolve(__dirname,"../BobbyBank/Karottenspeicher.db"));
    app.post("/logout", async (request,response)=>{
        if(await apiKeyCheck(request.body.UID, request.body.apiKey)){
            db.exec("UPDATE anhaenger SET apiKey=NULL WHERE userName=\'"+request.body.UID+"\'");
            response.status(200).json({Logout: "Logout successfully!"});
        }
    })
}