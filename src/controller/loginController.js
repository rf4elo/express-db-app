import { CompareHash } from "../utils/hash.js";
import { dbquery } from "../config/database.js";
import { SignJWT } from "jose";


const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);


export async function login(req, res) {
    const { login, password } = req.body;

    if(!login || !password) {
        return res.render("pages/login", { error: { "status":400, "message":"All fields must be filled." }, lastData: { "login":login, "password":password } });
    }

    const findUser = await dbquery(`
    SELECT * FROM users WHERE name = ?
    `, [login]);

    if(findUser.length > 0) {
        const comparePassword = await CompareHash(password, findUser[0].password);

        if(findUser[0].name == login && comparePassword) {

            
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
            return res.render("pages/login", { error: { "status":401, "message":"Unauthorized." }, lastData: { "login":login, "password": password } });
        }
    } else {
        return res.render("pages/login", { error: { "status":404, "message":"User not found." }, lastData: { "login": login, "password": password }});
    }

}


