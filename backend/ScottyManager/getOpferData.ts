import { Database } from "sqlite3";
import { Express } from "express";
import path from "path";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const getOpferData= (app:Express)=>{

    app.post("/konto", async (request,response)=>{
        const db= new PromissingSQLite3(new Database(path.resolve(__dirname,"../BobbyBank/Karottenspeicher.db")));
        const result= await db.getPrep("SELECT opferKonto FROM anhaenger WHERE userName=?",request.body.UID);
        response.status(200).json(result);
    })
}