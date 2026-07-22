import { dbquery } from "../config/database.js";
import * as UsersController from "../controller/usersController.js";
import { SignJWT } from "jose";


const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const API_KEY = await process.env.API_KEY;


export async function register(req, res) {
    const { name, email, password, confirm } = req.body;

    if(!name || !email || !password || !confirm) {
        return res.render("pages/register", { "error":{ "status":400, "message":"All fields must be filled." }, "lastData": { "name":name, "email":email, "password":password, "confirm":confirm } });
    };

    if(password != confirm) return res.render("pages/register.ejs", { error: { "status":400, "message":"The passwords must match." }, lastData: { "name":name, "email":email } });

    const userExists = dbquery(`
        SELECT * FROM users WHERE email = ?
    `, [email]);

    if(userExists.length > 0) {
        return res.render("pages/register.ejs", { error: { "status":409, "message":"Email is already in use." }, lastData: { "name":name, "email":email } });
    } else {
        
        const createdUser = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY
            },
            body: JSON.stringify({ "name":name, "email":email, "password":password })
        });

        const createdUserJSON = await createdUser.json();

        if(createdUserJSON.message == "User created successfully.") {

            const findUser = await dbquery(`
                SELECT * FROM users WHERE email = ?
            `, [email]);

            const token = await new SignJWT({ id: findUser[0].id })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('7d')
                .sign(SECRET);

            res.cookie('authToken', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.redirect("/");

        } else {

            return res.render("pages/register.ejs", { error: { "status":400, "message":createdUserJSON.error }, lastData: { "name":name, "email":email } })

        }
        
    }
}
