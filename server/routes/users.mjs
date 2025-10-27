import { Router } from "express";
import { loginPost, logoutPost } from "../controllers/users.mjs";
import { registerPost } from "../controllers/register.mjs";

const usersRouter = Router();
usersRouter.post("/logout", logoutPost);
usersRouter.post("/login", loginPost);
usersRouter.post("/register", registerPost);

export default usersRouter;
