import { Router } from "express";
import { indexGet, logoutGet } from "../controllers/index.mjs";
import usersRouter from "./users.mjs";
import registerRouter from "./register.mjs";
import driveRouter from "./drive/drive.mjs";
import isAuth from "../middleware/auth.mjs";

const indexRouter = Router();

indexRouter.get("/", indexGet);
indexRouter.get("/logout", logoutGet);
indexRouter.use("/users", usersRouter);
indexRouter.use("/drive", isAuth, driveRouter);

export default indexRouter;
