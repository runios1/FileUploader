import { Router } from "express";
import { deleteGet, deletePost } from "../../controllers/drive/delete.mjs";

const deleteRouter = Router();

deleteRouter.get("/:dirId", deleteGet);
deleteRouter.post("/:dirId", deletePost);

export default deleteRouter;
