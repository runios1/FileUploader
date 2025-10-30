import prisma from "../../config/prisma.mjs";
import supabase from "../../config/supabase.mjs";
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

async function deleteDirectory(req, res) {
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

    // const toDelete = await prisma.directory.findMany({
    //   where: {
    //     userId: req.user,
    //     path: {
    //       startsWith: directory.path,
    //     },
    //   },
    // });

    // if (!toDelete) {
    //   return res.status(500).json({
    //     error: "Prisma couldn't find any directories to delete.",
    //   });
    // }

    // toDelete.forEach(async (dir) => {
    //   let { error } = await supabase.storage
    //     .from("files")
    //     .remove(`${req.user}/${dir.path}`);
    //   if (error) {
    //     console.error(error);
    //     res.status(500).json({
    //       errors: [{ msg: `Error while deleting ${dir.path} from Supabase.` }],
    //     });
    //   }
    // });

    await prisma.directory.deleteMany({
      where: {
        userId: req.user,
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

export { deleteGet, deleteDirectory };
