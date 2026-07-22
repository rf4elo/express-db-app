import { Router } from "express";
import { login } from "../controller/loginController.js";
import { jwt_verify } from "../middleware/auth.js";


const PublicRoutes = Router();


PublicRoutes.get("/", jwt_verify, async (req, res) => {
    res.render("index.ejs");
});

PublicRoutes.get("/login", async (req, res) => {
    res.render("pages/login.ejs", { error: null, lastData: {}});
});

PublicRoutes.post("/login", login);


export default PublicRoutes;
