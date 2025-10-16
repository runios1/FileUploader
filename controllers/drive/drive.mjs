import { Type } from "@prisma/client";
import prisma from "../../config/prisma.mjs";

async function driveGet(req, res) {
  try {
    const directory = await prisma.directory.findFirst({
      where: {
        path: req.params.dirPath,
        userId: req.user.id,
      },
      include: {
        contents: true,
        parent: true,
      },
    });

    return res.render("drive", { directory, Type });
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
}

export { driveGet };
