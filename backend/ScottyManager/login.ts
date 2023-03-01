import { Express } from "express";
import { Database } from "sqlite3";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

export const login= (app:Express)=>{

    const db= new Database(path.resolve(__dirname,"../BobbyBank/Karottenspeicher.db"));
    app.post("/login",(request,response)=>{
        db.get("SELECT userName, passwort FROM anhaenger WHERE userName=\'"+request.body.UID+"\'",(_error,user)=>{           
            if(user==null){
                response.status(400).json({Login: "Username not existing!"});
            }else{
                bcrypt.compare(request.body.password,user.passwort, (_error, result)=>{
                    if(result){
                        response.status(200).json({Login: "Login successfull!"})
                    }else{
                        response.status(400).json({Login: "False password!"})
                    }
                });            
            }            
        })        
    })
}