import prisma from "../../config/prisma.mjs";
import { getParentPath } from "../../utils/path.mjs";

async function deleteGet(req, res) {
  try {
    const directory = await prisma.directory.findUnique({
      where: {
        id: parseInt(req.params.dirId),
      },
      include: {
        contents: true,
      },
    });
    res.render("delete", { directory });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
}

async function deletePost(req, res) {
  try {
    const directory = await prisma.directory.findUnique({
      where: {
        id: parseInt(req.params.dirId),
      },
    });
    if (!directory) {
      return res.status(500).json({
        error: "Prisma couldn't find the directory.",
      });
    }
    await prisma.directory.deleteMany({
      where: {
        userId: req.user.id,
        path: {
          startsWith: directory.path,
        },
      },
    });
    res.status(200).json({
      directory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export { deleteGet, deletePost };
