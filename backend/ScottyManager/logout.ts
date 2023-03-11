import { Express } from "express";
import { Database } from "sqlite3";
import { apiKeyCheck } from "./apiKeyCheck";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const logout= (dbOld: Database, app:Express)=>{

    const db = new PromissingSQLite3(dbOld);

    app.post("/logout", async (request,response)=>{
        if(await apiKeyCheck(dbOld, request.body.UID, request.body.apiKey)){
            db.execPrep("UPDATE anhaenger SET apiKey=NULL WHERE userName=?", request.body.UID);
            response.status(200).json({Logout: "Logout successfully!"});
        }
    })
}