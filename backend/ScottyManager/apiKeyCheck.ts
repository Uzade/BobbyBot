import { Database } from "sqlite3";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const apiKeyCheck= async (dbOld: Database, username:String, apiKey:String)=>{

    const db= new PromissingSQLite3(dbOld);

    if(apiKey==null){
        return false;
    }
    const user = await db.getPrep("SELECT userName, apiKey FROM anhaenger WHERE userName=?", username); 
                   
    if(user==null){
        return false;
    }else{
        if(apiKey==user.apiKey){
            return true;
        }else{
            return false;
        }                           
    }            
    
}
