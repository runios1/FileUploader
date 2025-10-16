import { Router } from "express";
import { loginGet, loginPost } from "../controllers/login.mjs";

const loginRouter = Router();
loginRouter.get("/", loginGet);
loginRouter.post("/", loginPost);

export default loginRouter;
