import { Router } from "express";
import * as UsersController from "../controller/usersController.js";

const usersRoutes = Router();


usersRoutes.get("/", UsersController.GetAll );
usersRoutes.post("/", UsersController.CreateUser );
usersRoutes.delete("/:id", UsersController.DeleteUser );

export default usersRoutes;