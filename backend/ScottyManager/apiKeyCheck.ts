import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const apiKeyCheck= async (db: PromissingSQLite3, username:String, apiKey:String)=>{

    if(apiKey==null){
        return false;
    }
    const user = await db.getPrepFile("ScottyManager/SQL/fetchApiKey.sql", username); 
                   
    if(user==null){
        return false;
    }

    if(apiKey!=user.apiKey){
        return false;
    }
    
    return true;
    
}
