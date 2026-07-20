import { Router } from "express";
import * as UsersController from "../controller/usersController.js";

const usersRoutes = Router();


usersRoutes.get("/users", UsersController.GetAll );
usersRoutes.get("/users/:id", UsersController.GetOne );
usersRoutes.post("/users", UsersController.CreateUser );
usersRoutes.delete("/users/:id", UsersController.DeleteUser );
usersRoutes.put("/users/:id", UsersController.UpdateUser );


export default usersRoutes;
