import { Database } from "sqlite3";

export const keyReset= (db: Database)=>{

        db.exec("UPDATE anhaenger SET apiKey=NULL");
}