import { Type } from "@prisma/client";
import prisma from "../../config/prisma.mjs";

async function driveGet(req, res) {
  try {
    const dirPath = req.params.dirPath.toString().replace(",", "/");
    const directory = await prisma.directory.findFirst({
      where: {
        path: dirPath,
        userId: req.user,
      },
      include: {
        contents: true,
        parent: true,
      },
    });

    // return res.render("drive", { directory, Type });
    return res.status(200).json({
      directory,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      err,
    });
  }
}

export { driveGet };
