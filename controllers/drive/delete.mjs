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
    res.status(500);
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
      console.error("Prisma couldn't find the directory.");
      return res.status(500);
    }
    await prisma.directory.deleteMany({
      where: {
        userId: req.user.id,
        path: {
          startsWith: directory.path,
        },
      },
    });
    return res.redirect(`/drive/${getParentPath(directory.path)}`);
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
}

export { deleteGet, deletePost };
