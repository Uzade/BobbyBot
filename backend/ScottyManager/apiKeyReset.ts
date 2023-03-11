import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const keyReset= (db: PromissingSQLite3)=>{

        db.exec("UPDATE anhaenger SET apiKey=NULL");
}