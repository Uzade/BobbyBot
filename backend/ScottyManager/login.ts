import { Express } from "express";
import bcrypt from "bcrypt";
import generateApiKey from 'generate-api-key/dist';
import { Response } from "express-serve-static-core";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const login= (db: PromissingSQLite3, app:Express)=>{

    app.post("/login",async (request,response) => {
        const user = await db.get("SELECT userName, passwort FROM anhaenger WHERE userName=\'"+request.body.UID+"\'");
               
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
}

export const apiexchange= (username:String, db: PromissingSQLite3, response:Response)=>{
    const apiKey=generateApiKey({ method: 'string', min: 34, max: 61 });
    db.execPrep("UPDATE anhaenger SET apiKey =? WHERE userName =?", apiKey, username);
    response.status(200).json({Login: "Login successfull!", apiKey:apiKey});
}