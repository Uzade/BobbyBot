import { Express } from "express";
import { Database } from "sqlite3";
import bcrypt from "bcrypt";
import generateApiKey from 'generate-api-key';
import { Response } from "express-serve-static-core";

export const login= (db: Database, app:Express)=>{

    app.post("/login",(request,response)=>{
        db.get("SELECT userName, passwort FROM anhaenger WHERE userName=\'"+request.body.UID+"\'",(_error,user)=>{           
            if(user==null){
                response.status(400).json({Login: "Username not existing!"});
            }else{
                bcrypt.compare(request.body.password,user.passwort, (_error, result)=>{
                    if(result){                        
                        apiexchange(request.body.UID, db, response);
                    }else{
                        response.status(400).json({Login: "False password!"})
                    }
                });            
            }            
        })        
    })
}

export const apiexchange= (username:String, db:Database, response:Response)=>{
    const apiKey=generateApiKey({ method: 'string', min: 34, max: 61 });
    db.exec("UPDATE anhaenger SET apiKey =\'"+apiKey+"\' WHERE userName =\'"+username+"\'");
    response.status(200).json({Login: "Login successfull!", apiKey:apiKey});
}