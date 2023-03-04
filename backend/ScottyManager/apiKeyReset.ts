import { Database } from "sqlite3";
import path from "path";

export const keyReset= ()=>{

    const db= new Database(path.resolve(__dirname,"../BobbyBank/Karottenspeicher.db"));
        db.exec("UPDATE anhaenger SET apiKey=NULL");
}