import { Router } from "express";
import { deleteGet, deleteDirectory } from "../../controllers/drive/delete.mjs";

const deleteRouter = Router();

deleteRouter.get("/:dirId", deleteGet);
deleteRouter.delete("/:dirId", deleteDirectory);

export default deleteRouter;
