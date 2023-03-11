import { Database } from "sqlite3";
import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const kontoLevelUp= (dbOld: Database)=>{

        const db = new PromissingSQLite3(dbOld);

        db.exec("UPDATE anhaenger SET opferKonto = opferKonto + 1");
}