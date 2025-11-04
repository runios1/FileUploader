import { Router } from "express";
import { driveGet, fileGet } from "../../controllers/drive/drive.mjs";
import addRouter from "./add.mjs";
import { deleteDirectory } from "../../controllers/drive/delete.mjs";

const driveRouter = Router();
driveRouter.use("/add", addRouter);

driveRouter.delete("/:dirId", deleteDirectory);
driveRouter.get("/file/{*dirPath}", fileGet);
driveRouter.get("/{*dirPath}", driveGet);

export default driveRouter;
