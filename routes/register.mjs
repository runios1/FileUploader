import { Router } from "express";
import { registerGet, registerPost } from "../controllers/register.mjs";

const registerRouter = Router();
registerRouter.get("/", registerGet);
registerRouter.post("/", registerPost);

export default registerRouter;
