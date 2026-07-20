import { Router } from "express";


const PublicRoutes = Router();


PublicRoutes.get("/", async (req, res) => {
    res.render("index.ejs");
});


export default PublicRoutes;
