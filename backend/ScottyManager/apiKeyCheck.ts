import { Database } from "sqlite3";
import path from "path";

export const apiKeyCheck= async (username:String, apiKey:String)=>{

    const db= new Database(path.resolve(__dirname,"../BobbyBank/Karottenspeicher.db"));
    const result= new Promise((resolve, _reject)=>{
        db.get("SELECT userName, apiKey FROM anhaenger WHERE userName=\'"+username+"\'",(_error,user)=>{
            if(apiKey==null){
                resolve(false);
            }           
            if(user==null){
                resolve(false);
            }else{
                if(apiKey==user.apiKey){
                    resolve(true);
                }else{
                    resolve(false);
                }                           
            }            
        }); 
    }); 
   return await result;  
}
