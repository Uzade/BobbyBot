import { Express } from "express";
import { Database } from "sqlite3";
import fs from "fs";
import path from "path";

export const login= (app:Express)=>{

    const db= new Database(path.resolve(__dirname,"../BobbyBank/Karottenspeicher.db"));

    app.post("/login",(request,response)=>{
        console.log(request.body);
        response.status(200).json({response: "Scotty am Apperat!"});
    })
}