import { Express } from "express";
import bcrypt from "bcrypt";
import generateApiKey from 'generate-api-key/dist';
import { Response } from "express-serve-static-core";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const login= (db: PromissingSQLite3, app:Express)=>{

    app.post("/login",async (request,response) => {

        if(request.body.UID == null || request.body.password == null){
            response.status(400).json({Login: "Missing username or password"});
            return;
        }

        const user = await db.getPrepFile("ScottyManager/SQL/fetchPassword.sql", request.body.UID);
               
        if(user==null){
            response.status(400).json({Login: "Username not existing!"});
            return;
        }
        bcrypt.compare(request.body.password,user.passwort, (_error, result)=>{
            if(!result){
                response.status(400).json({Login: "False password!"})
                return
            }
            apiexchange(request.body.UID, db, response);
        });                              
    })
}

export const apiexchange= (username:String, db: PromissingSQLite3, response:Response)=>{
    const apiKey=generateApiKey({ method: 'string', min: 34, max: 61 });
    db.execPrepFile("ScottyManager/SQL/saveApiKey.sql", apiKey, username);
    response.status(200).json({Login: "Login successfull!", apiKey:apiKey});
}