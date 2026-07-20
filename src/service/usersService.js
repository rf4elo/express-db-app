import { useTransition } from "react";
import { users_table } from "../config/db.js";
import { Hash } from "../utils/hash.js";



export async function GetAll() {
    return await users_table;
}

export async function GetOne(id) {
    return await users_table.filter(u => u.id == id);
}

export async function CreateUser(user) {

    const userIndex = await users_table.findIndex(u => u.name == user.name);

    if(userIndex >= 1) throw new Error("User already exists.");

    const userWithId = { "id":users_table.sort((a, b) => b.id - a.id)[0].id+1, ...user };

    userWithId.password = await Hash(userWithId.password);

    users_table.push(userWithId);

    return userWithId;

}

export async function DeleteUser(id) {

    const userIndex = await users_table.findIndex(u => u.id == id);

    if(userIndex = -1) throw new Error("User not found");

    users_table.splice(userIndex, 1);

    return { "message":"Deleted user successfully." };

}

