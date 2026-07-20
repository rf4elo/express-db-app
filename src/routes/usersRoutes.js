import { Router } from "express";
import * as UsersController from "../controller/usersController.js";

const usersRoutes = Router();


usersRoutes.get("/", UsersController.GetAll );
usersRoutes.get("/:id", UsersController.GetOne );
usersRoutes.post("/", UsersController.CreateUser );
usersRoutes.delete("/:id", UsersController.DeleteUser );
usersRoutes.put("/:id", UsersController.UpdateUser );


export default usersRoutes;
