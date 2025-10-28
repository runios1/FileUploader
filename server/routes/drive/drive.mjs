import { Router } from "express";
import { driveGet } from "../../controllers/drive/drive.mjs";
import addRouter from "./add.mjs";
import propertiesRouter from "./properties.mjs";
import deleteRouter from "./delete.mjs";

const driveRouter = Router();
driveRouter.use("/add", addRouter);
driveRouter.use("/properties", propertiesRouter);
driveRouter.use("/delete", deleteRouter);

driveRouter.get("/{*dirPath}", driveGet);

export default driveRouter;
