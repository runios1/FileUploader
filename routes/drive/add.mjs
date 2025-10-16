import { Router } from "express";
import { addGet, addPost } from "../../controllers/drive/add.mjs";

const addRouter = Router();
addRouter.get("/:dirPath", addGet);
addRouter.post("/:dirPath", addPost);

export default addRouter;
