import { Express } from "express";
import { Database } from "sqlite3";
import { apiKeyCheck } from "./apiKeyCheck";

export const logout= (db: Database, app:Express)=>{

    app.post("/logout", async (request,response)=>{
        if(await apiKeyCheck(db, request.body.UID, request.body.apiKey)){
            db.exec("UPDATE anhaenger SET apiKey=NULL WHERE userName=\'"+request.body.UID+"\'");
            response.status(200).json({Logout: "Logout successfully!"});
        }
    })
}