import { jwtVerify } from "jose";


const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);


export async function isSignIn(req, res, next) {

    const token = await req.cookies?.authToken;

    if(!token) return res.redirect("/login");

    const { payload } = await jwtVerify(token, SECRET);

    const response = await fetch(`http://localhost:3000/api/users/${payload.id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.API_KEY
        }
    });

    const userExists = await response.json();

    if(userExists.length == 0) {
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: "/"
        });
        return res.redirect("/login");
    }

    try {

        const { payload } = await jwtVerify(token, SECRET);
    
        req.user = payload;

        next();

    } catch (error) {
        res.clearCookie("authToken");
        return res.status(401).json({ "message":"Invalid token." });
    }
}

export async function isNotSignIn(req, res, next) {
    const token = await req.cookies?.authToken;

    if(token) return res.redirect("/");

    next();
}
