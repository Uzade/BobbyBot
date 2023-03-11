import { Express } from "express";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const getOpferData= (db: PromissingSQLite3, app:Express)=>{

    app.post("/konto", async (request,response)=>{
        const result= await db.getPrep("SELECT opferKonto FROM anhaenger WHERE userName=?",request.body.UID);

        if(result == null){
            response.status(400).json({Error: "invalid user name"})
            return;
        }
        response.status(200).json(result);
    })
}