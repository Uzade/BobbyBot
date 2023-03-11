import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const kontoLevelUp= (db: PromissingSQLite3)=>{

        db.exec("UPDATE anhaenger SET opferKonto = opferKonto + 1");
}