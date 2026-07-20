import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const dbpath = path.resolve(__dirname, "../../db.db");


const sqlite = sqlite3.verbose();


export const db = new sqlite.Database(dbpath, (err) => {
    if(err) {
        console.error(err);
    } else {
        console.log("Database connected.");
    }
});

export const dbquery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if(err) reject(err)
            else resolve(rows);
        });
    });
};

export const dbRun = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if(err) reject(err)
            else resolve({ id:this.lastID, change:this.changes });
        });
    });
};

