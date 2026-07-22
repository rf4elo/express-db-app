import { Router } from "express";

import { jwtVerify } from "jose";

import { login } from "../controller/loginController.js";
import { register } from "../controller/registerController.js";

import { isNotSignIn, isSignIn } from "../middleware/auth.js";



const PublicRoutes = Router();


const SECRET = await new TextEncoder().encode(process.env.JWT_SECRET);


PublicRoutes.get("/", isSignIn, async (req, res) => {
    const token = await req.cookies.authToken;

    const { payload } = await jwtVerify(token, SECRET);

    const response = await fetch(`http://localhost:3000/api/users/${payload.id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.API_KEY
        }
    });

    const user = await response.json();

    const filteredUser = { "name":user[0].name, "email":user[0].email };

    return res.render("index.ejs", { "user": filteredUser });
});

// LOGIN
PublicRoutes.get("/login", isNotSignIn, async (req, res) => {
    res.render("pages/login.ejs", { error: null, lastData: {}});
});

PublicRoutes.post("/login", isNotSignIn, login );

// REGISTER
PublicRoutes.get("/register", isNotSignIn, async (req, res) => {
    res.render("pages/register.ejs", { error: null, lastData: {} });
});

PublicRoutes.post("/register", isNotSignIn, register );



export default PublicRoutes;
