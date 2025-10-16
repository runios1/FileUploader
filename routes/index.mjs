import { Router } from "express";
import { indexGet, logoutGet } from "../controllers/index.mjs";
import loginRouter from "./login.mjs";
import registerRouter from "./register.mjs";
import driveRouter from "./drive/drive.mjs";
import isAuth from "../middleware/auth.mjs";

const indexRouter = Router();

indexRouter.get("/", indexGet);
indexRouter.get("/logout", logoutGet);
indexRouter.use("/login", loginRouter);
indexRouter.use("/register", registerRouter);
indexRouter.use("/drive", isAuth, driveRouter);

export default indexRouter;
