import { useTransition } from "react";
import { Hash } from "../utils/hash.js";
import { dbRun, dbquery } from "../config/database.js";


export async function GetAll() {
    // return await users_table;

    return await dbquery("SELECT * FROM users");

}

export async function GetOne(id) {
    return await users_table.filter(u => u.id == id);
}

export async function CreateUser(user) {

    const userIndex = await users_table.findIndex(u => u.name == user.name);

    if(userIndex >= 1) throw new Error("User already exists.");

    const userWithId = { "id":users_table.sort((a, b) => b.id - a.id)[0].id+1, ...user };

    userWithId.password = await Hash(userWithId.password);

    const { id, name, password } = userWithId;

    const query = `INSERT INTO users (id, name, password) VALUES (?, ?, ?)`;
    return await dbquery(query, [id, name, password]);

    // return userWithId;

}

