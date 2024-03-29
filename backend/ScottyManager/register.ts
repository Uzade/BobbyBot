import { Express } from "express";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { apiexchange } from "./login";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const register= (db: PromissingSQLite3, app:Express)=>{

    app.post("/register",async (request,response)=>{
        if(request.body.UID==null || request.body.password==null){
            response.status(401).json({Register: "UID or Password not set!"});
            return;
        }
        const user = await db.getPrepFile("ScottyManager/SQL/fetchPassword.sql", request.body.UID);
                  
        if(user!=null){
            response.status(400).json({Register: "Username already existing!"});
            return;
        }      
        bcrypt.hash(request.body.password, 10, (_err, hash) => {
            db.execPrepFile("ScottyManager/SQL/addUser.sql",
                request.body.UID,
                hash,
                0,2
            )
        apiexchange(request.body.UID, db, response);
        });            
    })
}