import { Router } from "express";
import usersRouter from "./users.mjs";
import driveRouter from "./drive/drive.mjs";
import isAuth from "../middleware/auth.mjs";

const indexRouter = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/drive", isAuth, driveRouter);

export default indexRouter;
