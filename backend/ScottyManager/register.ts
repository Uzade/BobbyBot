import { Express } from "express";
import { Database } from "sqlite3";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

export const register= (app:Express)=>{

    const db= new Database(path.resolve(__dirname,"../BobbyBank/Karottenspeicher.db"));
    app.post("/register",(request,response)=>{
        db.get("SELECT userName, passwort FROM anhaenger WHERE userName=\'"+request.body.UID+"\'",(_error,user)=>{           
            if(user!=null){
                response.status(400).json({Register: "Username already existing!"});
            }else{
               const addStmt=db.prepare(fs.readFileSync(path.resolve(__dirname,"../BobbyBank/addUser.sql")).toString());               
               bcrypt.hash(request.body.password, 10, (_err, hash) => {
                addStmt.run(request.body.UID,hash,0,2);
                addStmt.finalize();
                response.status(201).json({Register: "Account successfully created!"});
               });
            }            
        })        
    })
}