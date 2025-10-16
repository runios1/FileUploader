import { Router } from "express";
import { propertiesGet } from "../../controllers/drive/properties.mjs";

const propertiesRouter = Router();
propertiesRouter.get("/:dirId", propertiesGet);

export default propertiesRouter;
