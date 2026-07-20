import { dbRun } from "./database.js";


export const initDatabase = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `;
    await dbRun(query);
    console.log("Created database.");
};

