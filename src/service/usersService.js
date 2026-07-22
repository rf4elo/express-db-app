import { useTransition } from "react";
import { Hash } from "../utils/hash.js";
import { dbRun, dbquery } from "../config/database.js";


export async function GetAll() {
    return await dbquery("SELECT * FROM users");
}

export async function GetOne(id) {
    return await dbquery("SELECT * FROM users WHERE id = (?)", [id]);
}

export async function CreateUser(user) {

    const { id, name, email, password } = user;
    
    const UserExists = await dbquery("SELECT * FROM users WHERE email = (?)", [email]);

    if(UserExists.length > 0) throw new Error("User already exists.");

    const hashPassword = await Hash(password);

    const query = `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`;
    
    return await dbquery(query, [id, name, email, hashPassword]);

}

export async function DeleteUser(id) {

    const UserExists = await dbquery("SELECT * FROM users WHERE id = (?)", [id]);

    if(UserExists.length == 0) throw new Error("User not found.");

    const deletedUser = await dbquery("SELECT * FROM users WHERE id = (?)", [id]);

    await dbquery("DELETE FROM users WHERE id = (?)", [id]);

    return deletedUser;

}

export async function UpdateUser(id, updatedUser) {
    const { name, email, password } = updatedUser;

    const UserExists = await dbquery("SELECT * FROM users WHERE id = ?", [id]);
    if(UserExists.length == 0) throw new Error("User not found.");

    if(name) {
        dbquery("UPDATE users SET name = ? WHERE id = ?", [name, id]);
    }

    if(email) {
        dbquery("UPDATE users SET email = ? WHERE id = ?", [email, id]);
    }

    if(password) {
        const hashPassword = await Hash(password);
        dbquery("UPDATE users SET password = ? WHERE id = ?", [hashPassword, id]);
    }

    return await dbquery("SELECT * FROM users WHERE id = ?", [id]);

}

