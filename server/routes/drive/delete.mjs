import { Router } from "express";
import { deleteDirectory } from "../../controllers/drive/delete.mjs";

const deleteRouter = Router();

deleteRouter.delete("/:dirId", deleteDirectory);

export default deleteRouter;
