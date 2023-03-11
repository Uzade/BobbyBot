import { PromissingSQLite3 } from "promissing-sqlite3/lib";

export const kontoLevelUp= (db: PromissingSQLite3)=>{

        db.execFile("ScottyManager/SQL/incrementKonto.sql");
}