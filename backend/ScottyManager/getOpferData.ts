import { Database } from "sqlite3";
import { Express } from "express";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const getOpferData= (dbOld: Database, app:Express)=>{

    app.post("/konto", async (request,response)=>{
        const db= new PromissingSQLite3(dbOld);        
        const result= await db.getPrep("SELECT opferKonto FROM anhaenger WHERE userName=?",request.body.UID);
        response.status(200).json(result);
    })
}