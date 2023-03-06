import { Express } from "express";
import { Database } from "sqlite3";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { apiexchange } from "./login";

export const register= (db: Database, app:Express)=>{

    app.post("/register",(request,response)=>{
        if(request.body.UID==null || request.body.password==null){
            response.status(401).json({Register: "UID or Password not set!"});
            return;
        }
        db.get("SELECT userName, passwort FROM anhaenger WHERE userName=\'"+request.body.UID+"\'",(_error,user)=>{           
            if(user!=null){
                response.status(400).json({Register: "Username already existing!"});
            }else{
               const addStmt=db.prepare(fs.readFileSync(path.resolve(__dirname,"../BobbyBank/addUser.sql")).toString());               
               bcrypt.hash(request.body.password, 10, (_err, hash) => {
                addStmt.run(request.body.UID,hash,0,2);
                addStmt.finalize();
                apiexchange(request.body.UID, db, response);
               });
            }            
        })        
    })
}