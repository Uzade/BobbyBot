import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const apiKeyCheck= async (db: PromissingSQLite3, username:String, apiKey:String)=>{

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
