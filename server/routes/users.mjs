import { Router } from "express";
import { loginPost, logoutPost } from "../controllers/users.mjs";
import isAuth from "../middleware/auth.mjs";
import { registerPost } from "../controllers/register.mjs";

const usersRouter = Router();
usersRouter.post("/logout", logoutPost);
usersRouter.post("/login", loginPost);
usersRouter.post("/register", registerPost);
usersRouter.get("/auth", isAuth, (req, res) =>
  res.json({ authenticated: true })
);

export default usersRouter;
