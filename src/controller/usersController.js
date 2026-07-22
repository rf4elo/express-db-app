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

export async function GetOne(req, res) {
    try {
        const { id } = await req.params;
        const user = await userService.GetOne(id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ "message":"User not found." });
    }
}

export async function CreateUser(req, res) {
    try {
        const { name, email, password } = await req.body;
        const user = await new userDto(name, email, password);
        const createdUser = await userService.CreateUser(user);
        return res.status(201).json({ "message":"User created successfully." });
    } catch (error) {
        return res.status(409).json({ "error":error.message });
    }
}

export async function DeleteUser(req, res) {
    try {
        const { id } = await req.params;
        const response = await userService.DeleteUser(id);
        return res.status(200).json({ "message":"User deleted successfully", deletedUser:response });
    } catch (error) {
        return res.status(404).json({ "error":error.message });
    }
}

export async function UpdateUser(req, res) {
    try {
        const { id } = await req.params;
        const user = await req.body;
        const response = await userService.UpdateUser(id, user);
        return res.status(201).json({ "message":"Updated user successfully", "updatedUser":response });
    } catch (error) {
        return res.status(404).json({ "error":error.message });
    }
}

