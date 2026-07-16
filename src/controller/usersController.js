import * as userService from "../service/usersService.js";
import { userDto } from "../models/userDto.js";


export async function GetAll(req, res) {
    try {
        const users = await userService.GetAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json({ "error":error.message });
    }
}

export async function CreateUser(req, res) {
    try {
        const { name, password } = await req.body;
        const user = await new userDto(name, password);
        const createdUser = await userService.CreateUser(user);
        return res.status(201).json({ "message":"User created successfully.", "user":createdUser })
    } catch (error) {
        return res.status(400).json({ "error":error.message });
    }
}

export async function DeleteUser(req, res) {
    try {
        const { id } = await req.params;
        const deletedUser = await userService.DeleteUser(+id);
        return res.status(200).json(deletedUser);
    } catch (error) {
        return res.status(404).json({ "error":error.message });
    }
}
