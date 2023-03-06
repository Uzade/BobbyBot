import { Database } from "sqlite3";

export const kontoLevelUp= (db: Database)=>{

        db.exec("UPDATE anhaenger SET opferKonto = opferKonto + 1");
}