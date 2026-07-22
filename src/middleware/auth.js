import { jwtVerify } from "jose";


const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);


export async function jwt_verify(req, res, next) {

    const token = await req.cookies?.authToken;

    if(!token) return res.redirect("/login");

    try {

        const { payload } = await jwtVerify(token, SECRET);
    
        req.user = payload;

        next();

    } catch (error) {
        res.clearCookie("authToken");
        return res.status(401).json({ "message":"Invalid token." });
    }

}

