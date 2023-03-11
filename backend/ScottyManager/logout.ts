import { Express } from "express";
import { apiKeyCheck } from "./apiKeyCheck";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const logout= (db: PromissingSQLite3, app:Express)=>{

    app.post("/logout", async (request,response)=>{
        if(await apiKeyCheck(db, request.body.UID, request.body.apiKey)){
            db.execPrep("UPDATE anhaenger SET apiKey=NULL WHERE userName=?", request.body.UID);
            response.status(200).json({Logout: "Logout successfully!"});
        }
    })
}